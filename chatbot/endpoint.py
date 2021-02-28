import nltk
from nltk.stem.lancaster import LancasterStemmer
stemmer = LancasterStemmer()
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS, cross_origin
import random
import json
import pickle
import pandas as pd
import numpy as np
import tensorflow as tf
import requests 
import time 

model = tf.keras.models.load_model('chatbot.h5')
#preprocessing data 
data = pickle.load( open( "learning_chatbot.pkl", "rb" ) )
words = data['words']
classes = data['classes']
intents = json.loads(open('intents.json').read())
intents = intents["intents"]
#function for tokenisin and stemming the input sentences
def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [stemmer.stem(word.lower()) for word in sentence_words]
    return sentence_words
#function to check if the word is in vocabulary
def bow(sentence, words, show_details=True):
    sentence_words = clean_up_sentence(sentence)
    bag = [0]*len(words)  
    for s in sentence_words:
        for i,w in enumerate(words):
            if w == s: 
                bag[i] = 1
                if show_details:
                    pass

    return(np.array(bag))
#function to fetch appropriate response
def classify_flask(sentence):
    
    prob_threshold = 0.50
    input_data = pd.DataFrame([bow(sentence, words)], dtype=float, index=['input'])
    results = model.predict([input_data])[0]
    results = [[i,r] for i,r in enumerate(results) if r>prob_threshold]
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    
    for r in results:
        return_list.append({"intent": classes[r[0]], "probability": str(r[1])})
    try:
        answer_class = return_list[0]
        answer_class = answer_class["intent"]
        for i in intents:
            if i['tag'] == answer_class:
                ans = i['responses']
                num = len(ans)
                answer_number = random.randrange(0,num)
                answer = ans[answer_number]
        response = answer
    except:
        li = ["Can you rephrase and try?","what else can i help you with?","Lets talk something else", "tell me more about you", "what songs do you prefer?", "You have to sing karaoke, what song do you pick?", "If you could add anyone to Mount Rushmore who would it be"]
        response = li[random.randrange(0,len(li))]
    return response
#function to fetch news
def news():
    url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=090129b20ca84810a0dfdce46f31d06e'
    try: 
        response = requests.get(url) 
    except: 
        print('error')
    news = json.loads(response.text)
    i=0
    fnews = ''
    for new in news['articles']: 
        i+=1
        fnews+="#####    News   ###### "+str(i) + ': ' 
        fnews+= str(new['title']) 
        fnews+=' -> url:     '
        fnews+=str(new['url']) + "              "
        if i>2:
            break
    return fnews
     

app = Flask(__name__)
CORS(app)
#routes to access functions through website
@app.route("/")
def home():
    return render_template('readme.html')

@app.route("/bot", methods=['GET','POST'])
def classify(): 
    return render_template('home.html')
@app.route('/get')
def getmsg():
    userText = str(request.args.get('msg'))
    final = classify_flask(userText)
    if final == 'Getting news ...':
        final = news()
    return final
@app.route("/rbot/<sentence>", methods=['GET','POST'])
def getms(sentence): 
    response = classify_flask(sentence)
    return jsonify(answer=response)
if __name__ == "__main__":
    app.run(debug=True)

