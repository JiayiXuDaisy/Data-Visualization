from flask import Flask,render_template,request, jsonify, Blueprint,redirect
from flask_paginate import Pagination, get_page_parameter
import csv
from math import ceil
import numpy as np

app = Flask(__name__)
data = [] #list格式数据
country_list = []
series_list = []
file = open('./countriesData.csv')
lines = csv.reader(file)
for line in lines:
    if line[1] =="ZAR":
        line[1] ="COD"
    if line[1] =="SSD":
        line[1] = "SDS"
    if line[1] =="ROM":
        line[1] = "ROU"

    if line[0] == "Timor-Leste":
        line[0] = "East Timor"
    if line[0] =="Taiwan- China":
        line[0] ="Taiwan"
    if line[0] == "Yemen- Rep":
        line[0] ="Yemen"
    if line[0] == "Guam":
        line[0] = "Guatemala"
    if line[0] =="Gambia- The":
        line[0] = "Gambia"
    if line[0] =="Guinea-Bissau":
        line[0] = "Guinea Bissau"
    if line[0] =="Congo- Rep.":
        line[0] = "Republic of the Congo"
    if line[0] =="Congo- Dem. Rep.":
        line[0] = "Democratic Republic of the Congo"
    if line[0] =="Kyrgyz Republic":
        line[0] ="Kyrgyzstan"
    if line[0] =="Slovak Republic":
        line[0] ="Slovakia"
    if line[0] =="United Kingdom":
        line[0] = "England"


    data.append([line[0],line[1],line[2],line[4],line[5],line[6],line[7],line[8]])
    if line[0] not in country_list:
        country_list.append(line[0])
    if line[2] not in series_list:
        series_list.append(line[2])
del data[0]
del country_list[0]
del series_list[0]
print(series_list)
print(len(series_list))

@app.route('/',methods = ['POST','GET'])
def index():
    return redirect('/chart')

@app.route('/chart')
def chart():
    print(country_list)
    limit = 10000
    country_selected = str(request.args.get('country_selected'))
    series_selected  = str(request.args.get('series_selected'))
    year_selected = str(request.args.get('year_selected'))

    print(country_selected)
    print(series_selected)
    print(year_selected)

    ##### for table #####
    data_filter1=[]
    if country_selected == 'blank' or country_selected == 'None' :
        country_selected = "China"
    if year_selected == 'blank' or year_selected =='None':
        year_selected = "2010"
    if series_selected == 'blank' or series_selected =='None':
        series_selected = "GDP growth (annual %)"

    for line in data:
        if line[0] == country_selected:
            data_filter1.append(line)

    print(data_filter1)
    data1 = np.array(data_filter1)[:, 0:3]
    data2 = np.array(data_filter1)[:, int(year_selected) -2007:int(year_selected) -2006]
    table_data = np.append(data1, data2, axis=1)
    table_data = table_data.tolist()
    data1 = []
    data2 = []
    print("table data:")
    print(table_data)

    ##### for map #####
    data_filter2=[]

    for line in data:
        if line[2] == series_selected:
            data_filter2.append(line)

    data3 = np.array(data_filter2)[:, 0:3]
    data4 = np.array(data_filter2)[:, int(year_selected) -2007:int(year_selected) -2006]
    map_data = np.append(data3, data4, axis=1)
    map_data = map_data.tolist()
    print("map data:")
    print(map_data)

    ##### for line #####
    data_filter3 = []

    for line in data:
        if line[0] == country_selected:
            data_filter3.append(line)

    line_data = []

    for line in data_filter3:
        if line[2] == series_selected:
            line_data.append(line)
    line_data = np.array(line_data)[:, 3:]
    line_data = line_data.tolist()
    print("line data:")
    print(line_data)
    last_country = country_selected
    return render_template('index.html',table_data = table_data, map_data = map_data, line_data = line_data, country_list=country_list, series_list = series_list, country_selected = country_selected,series_selected = series_selected, year_selected = year_selected)

if __name__ == '__main__':
    app.run(debug = True)
