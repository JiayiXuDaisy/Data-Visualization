import xlrd
import json
import csv
import pandas as pd
import re
# from __future__ import unicode_literals

class process(object):
    def nation_cnt(self):
        data = xlrd.open_workbook('./data.xlsx')
        print(data.sheet_names())
        data = data.sheet_by_index(0)
        print(data.cell_value(0,0))
        nation = data.col_values(3)
        print(len(nation))
        print(nation[0])
        del(nation[0])
        print(len(nation))
        for i in range(len(nation)):
            nation[i]  =nation[i][:2]
        print(nation)

        dict ={}
        for key in nation:
            dict[key] = dict.get(key,0) + 1
        print(dict)
        for i in range(1,len(nation)):
            print(i)
        js = json.dumps(dict,ensure_ascii=False)
        # js = json.dumps(dict)

        f = open('nation_cnt.json','w')
        f.write(js)
        f.close()
    def csv2json(self):
        dict = {}
        with open("pro_data.csv","r",encoding="utf-8") as f:
            reader = csv.reader(f,delimiter=',')
            fieldnames = next(reader)
            reader = csv.DictReader(f,fieldnames=fieldnames,delimiter=',')
            data = []
            id = 0
            new_reader = []
            name = []

            for i,row in enumerate(reader):
                if i == 0:
                    last = row['name']
                    row['id'] = id
                    name.append(last)
                if row['name'] != last:
                    id +=1
                    last = row['name']
                    row['id'] = id
                    name.append(last)
                else:
                    last = row['name']
                    row['id'] = id
                new_reader.append(row)
                print(name)

            for row in new_reader:
                d={}
                for k,v in row.items():
                    d[k]=v
                data.append(d)
                print(d)
            # print(data)
        js = json.dumps(data, ensure_ascii=True)
        # print(js)
        f = open('pro_data.json', 'w')
        f.write(js)
        f.close()
        js = json.dumps(name, ensure_ascii=True)
        f = open('name.json','w')
        f.write(js)
        f.close()
    def majot_cnt(self):
        data = xlrd.open_workbook('./data.xlsx')
        data = data.sheet_by_index(0)

        major = data.col_values(6)
        del(major[0])
        new_major = []

        for i,row in enumerate(major):
            new_row = str(row).replace('、', ',')
            new_major.append(new_row)
        print(new_major)

        n_new_major = []
        for i,row in enumerate(new_major):
            new_row = row.split(',')
            for i in range(len(new_row)):
                n_new_major.append(new_row[i])
        print(n_new_major)

        dict = {}
        for key in n_new_major:
            dict[key] = dict.get(key,0) + 1
        key_list = list(dict.keys())
        value_list = list(dict.values())

        major_cnt = [key_list,value_list]
        major_cnt = list(map(list,zip(*major_cnt)))

        index = ['major', 'cnt']
        f = pd.DataFrame(columns=index,data = major_cnt)
        f.to_csv('./major_cnt.csv',encoding='utf-8')
        js = json.dumps(dict,ensure_ascii=True)

        f = open('major_cnt.json','w')
        f.write(js)
        f.close()
    def relation(self):

        data = xlrd.open_workbook('./data.xlsx')
        print(data.sheet_names())
        data = data.sheet_by_index(0)
        name_list = data.col_values(0)
        del(name_list[0])
        print(name_list)

        with open("pro_data.csv","r",encoding="utf-8") as f:
            reader = csv.reader(f,delimiter=',')

            data = []
            for line in reader:
                data.append(line)

        f = []
        for name in name_list:
            flare = {}
            flare['name'] = name
            flare['size'] = 0
            flare['imports'] = []
            # print(flare)
            resume = []
            for row in data:
                if row[1] ==name:
                    resume.append(row)
                else:
                    for line in resume:
                        # print(line)
                        # print(row)
                        if (row[7] == line[7]) and (row[8] == line[8]) and (row[2]<line[3]) and (row[3] > line [2]):
                            # print(row[6])
                            # print(line[6])
                            # print(row[7])
                            # print(line[7])
                            # print(line)
                            # print(row)
                            if row[1] not in flare['imports']:
                                flare['imports'].append(row[1])
            f.append(flare)

        js = json.dumps(f, ensure_ascii=True)
        f = open('flares.json', 'w')
        f.write(js)
        f.close()





if __name__ == '__main__':
    p = process()
    # p.nation_cnt()
    # p.csv2json()
    # p.majot_cnt()
    p.relation()
