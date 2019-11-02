#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import Flask, request
from flask_restful import Resource, Api
import os
import sys
from flask_cors import CORS

import newspaper
import nltk

from newspaper import Article

app = Flask(__name__)
api = Api(app)


def allMethods(article):
    article.download()
    article.parse()
    # article.nlp()
    print('debug')

    return {
        'authors': article.authors,
        'pubishDate': article.publish_date.strftime("%m/%d/%Y"),
        # 'keywords': article.keywords,
        # 'summary': article.summary,
        'text': article.text,
        'topImg': article.top_image,
        'movies': article.movies
    }

def authors():
    return {'response': 'Not Yet implemented!'}

def publishDate():
    return {'response': 'Not Yet implemented!'}

def keywords():
    return {'response': 'Not Yet implemented!'}

def summary():
    return {'response': 'Not Yet implemented!'}
    
def text():
    return {'response': 'Not Yet implemented!'}

def topImg():
    return {'response': 'Not Yet implemented!'}

def movies():
    return {'response': 'Not Yet implemented!'}

class BasicData(Resource):

    def get(self, option):
        args = request.args
        url = args.get('url')
        options = {
            'all': allMethods,
            'authors': authors,
            'pubishDate': publishDate,
            'keywords': keywords,
            'summary': summary,
            'text': text,
            'topImg': topImg,
            'movies': movies
        }
        articles = Article(url)

        return options[option](articles)


api.add_resource(BasicData, '/basicData/<option>',)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)
