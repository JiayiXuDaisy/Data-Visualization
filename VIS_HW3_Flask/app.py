from flask import Flask,render_template,request, jsonify, Blueprint,redirect
from flask_paginate import Pagination, get_page_parameter
import csv
from math import ceil
import numpy as np

app = Flask(__name__)

data = [] #list格式数据
file = open('./countriesData.csv')
lines = csv.reader(file)
for line in lines:
    data.append(line)
title = data.pop(0) #去除表头

# 初始调用
@app.route('/',methods = ['POST','GET'])
def index():
    return redirect('/1') #跳转至第一页

# 添加数据
@app.route('/add', methods = ['POST'])
def add():
    CountryName = request.get_json()["CountryName"]
    SeriesName = request.get_json()["SeriesName"]
    data2010 = request.get_json()["data2010"]
    data2011 = request.get_json()["data2011"]
    data2012 = request.get_json()["data2012"]
    data2013 = request.get_json()["data2013"]
    data2014 = request.get_json()["data2014"]

    new_data = [CountryName,"",SeriesName,"",data2010,data2011,data2012,data2013,data2014]
    data.insert(0,new_data)
    for line in data:
        print(line)
    file = open("countriesData.csv",'w',newline='')
    writer = csv.writer(file)
    writer.writerow(title)
    for row in data:
        writer.writerow([row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7],row[8]])
    return jsonify({"data" : data})

# 页面跳转
@app.route('/<int:page_index>')
def load_page(page_index):
    limit = 5   #每页显示的数目为5
    row_length = len(data)      #数据总的条目数
    page_num = int(ceil(row_length / limit))   #展示数据所需的页数
    start = (page_index - 1) * limit   #指定页的起始数据
    end = page_index * limit   #指定页最后数据的后一个数据
    page = data[start:end]  #指定页所需呈现的数据
    return render_template('index.html', page=page, page_num=page_num, page_index=page_index)

if __name__ == '__main__':
    app.run(debug = True)
