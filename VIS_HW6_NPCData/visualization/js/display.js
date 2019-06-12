function drawMap(){
    var width = 600;
    var height = 360;
    var map_svg = d3.select("#map").select("#map_svg") 
        .attr("width",width)
        .attr("height",height);
    var projection = d3.geoMercator()
        .center([107,31])
        .scale(360)
        .translate([width/2-30,height/2+20]);
    var path = d3.geoPath()
        .projection(projection);
    var heavyColor = d3.rgb(244,62,13);
    var lightColor =d3.rgb(244,225,150)
    var color = d3.interpolate(lightColor,heavyColor);
    var color_def = map_svg.append("defs");
    var linearGradient = color_def.append("linearGradient")
            .attr("id","linearColor")
            .attr("x1","0%")
            .attr("y1","0%")
            .attr("x2","100%")
            .attr("y2","0%");
    var stop1 = linearGradient.append("stop")
            .attr("offset","0%")
            .style("stop-color",lightColor.toString());
    var stop2 = linearGradient.append("stop")
            .attr("offset","100%")
            .style("stop-color",heavyColor.toString());
    var colorRect = map_svg.append("rect")
            .attr("x", 20)
            .attr("y", height-40)
            .attr("width", 100)
            .attr("height", 20)
            .style("fill","url(#" + linearGradient.attr("id") + ")");

    var minValueText = map_svg.append("text")
            .attr("class","valueText")
            .attr("x", 20)
            .attr("y", height-40)
            .attr("dy", "-0.3em")
            .text(function(){
                return 1;
            });

    var maxValueText = map_svg.append("text")
                .attr("class","valueText")
                .attr("x", 110)
                .attr("y", height-40)
                .attr("dy", "-0.3em")
                .text(function(){
                    return 30;
                });
    var tooltip = map_svg.append("text")
                .attr("x",140)
                .attr("y",height-30)
                .attr("font-size",20)
                .attr("fill","black")
                .style("opacity",0)
                .attr("class","tooltip");

    d3.json("data/nation_cnt.json",function(nation){
        var linear_scale = d3.scaleLinear()
            .domain([1,30])
            .range([0,1]);
        d3.json("js/china.js",function(data){
            // console.log(nation);
            map_svg.selectAll("path")
                .data(data.features)
                .enter()
                .append("path")
                .attr("stroke","white")
                .attr("fill",function(d,i){
                    // console.log(d.properties.name.slice(0,2));
                    // console.log(nation[d.properties.name]);
                    if(nation[d.properties.name.slice(0,2)] != undefined){
                        col = color(linear_scale(nation[d.properties.name.slice(0,2)]));
                        return col.toString();
                    }
                    else{
                        return "lightgrey";
                    }
                })
                .attr("d",path)
                .on("mouseover",function(d){
                    var text = "0";
                    if(nation[d.properties.name.slice(0,2)] != undefined){
                        text=nation[d.properties.name.slice(0,2)].toString();
                    }
                    // console.log(d.properties.name);
                    // console.log(nation[d.properties.name.slice(0,2)]);
                    tooltip.text("Province:"+d.properties.name+"\t Number:"+nation[d.properties.name.slice(0,2)])
                        .style("opacity",1);
                })
                .append('title')
                .text(function(d) {
                    return d.properties.name + ": " + nation[d.properties.name.slice(0,2)]
                });


        }); 

    })   
}

function drawTimeLine(){
    //data
    d3.json("data/pro_data.json",function(resume){
        // console.log(resume);

        var lanes = ["\u4e59\u6653\u5149", "\u4e01\u6765\u676d", "\u4e01\u5b66\u4e1c", "\u4e01\u859b\u7965", "\u4e8e\u4f1f\u56fd", "\u4e8e\u5fe0\u798f", "\u4e07\u7acb\u9a8f", "\u4e60\u8fd1\u5e73", "\u9a6c\u98da", "\u9a6c\u5174\u745e", "\u738b\u5b81", "\u738b\u519b", "\u738b\u52c7", "\u738b\u6668", "\u738b\u6bc5", "\u738b\u5c0f\u6d2a", "\u738b\u7389\u666e", "\u738b\u6b63\u4f1f", "\u738b\u4e1c\u660e", "\u738b\u4e1c\u5cf0", "\u738b\u5c14\u4e58", "\u738b\u5fd7\u6c11", "\u738b\u5fd7\u521a", "\u738b\u6caa\u5b81", "\u738b\u56fd\u751f", "\u738b\u5efa\u519b", "\u738b\u5efa\u6b66", "\u738b\u6653\u4e1c", "\u738b\u6653\u6656", "\u738b\u5bb6\u80dc", "\u738b\u8499\u5fbd", "\u5c24\u6743", "\u8f66\u4fca", "\u5c39\u529b", "\u5df4\u97f3\u671d\u9c81", "\u5df4\u7279\u5c14", "\u827e\u529b\u66f4\u00b7\u4f9d\u660e\u5df4\u6d77", "\u77f3\u6cf0\u5cf0", "\u5e03\u5c0f\u6797", "\u5362\u5c55\u5de5", "\u767d\u6625\u793c", "\u5409\u70b3\u8f69\u3000", "\u6bd5\u4e95\u6cc9", "\u66f2\u9752\u5c71", "\u6731\u751f\u5cad", "\u5218\u5947", "\u5218\u96f7", "\u5218\u9e64", "\u5218\u58eb\u4f59", "\u5218\u4e07\u9f99", "\u5218\u5947\u8446", "\u5218\u56fd\u4e2d", "\u5218\u56fd\u6cbb", "\u5218\u91d1\u56fd", "\u5218\u7ed3\u4e00", "\u5218\u632f\u7acb", "\u5218\u5bb6\u4e49", "\u5218\u8d50\u8d35", "\u5218\u7ca4\u519b\u3000", "\u9f50\u624e\u62c9", "\u5b89\u5146\u5e86", "\u8bb8\u52e4", "\u8bb8\u53c8\u58f0", "\u8bb8\u8fbe\u54f2", "\u8bb8\u5176\u4eae", "\u962e\u6210\u53d1", "\u5b59\u5fd7\u521a", "\u5b59\u91d1\u9f99", "\u5b59\u7ecd\u9a8b", "\u5b59\u6625\u5170", "\u675c\u5bb6\u6beb", "\u674e\u5c79", "\u674e\u5e0c", "\u674e\u658c", "\u674e\u5f3a", "\u674e\u5e72\u6770", "\u674e\u5c0f\u9e4f", "\u674e\u51e4\u5f6a", "\u674e\u7389\u8d4b", "\u674e\u4f20\u5e7f", "\u674e\u7eaa\u6052", "\u674e\u514b\u5f3a", "\u674e\u4f5c\u6210", "\u674e\u5c1a\u798f", "\u674e\u56fd\u82f1", "\u674e\u6865\u94ed", "\u674e\u6653\u7ea2", "\u674e\u9e3f\u5fe0", "\u674e\u9526\u658c", "\u6768\u5b66\u519b", "\u6768\u6d01\u7bea", "\u6768\u632f\u6b66", "\u6768\u6653\u6e21", "\u8096\u6377", "\u8096\u4e9a\u5e86", "\u5434\u793e\u6d32", "\u5434\u82f1\u6770", "\u5434\u653f\u9686", "\u90b1\u5b66\u5f3a", "\u4f55\u5e73", "\u4f55\u7acb\u5cf0", "\u5e94\u52c7", "\u9b4f\u51e4\u548c", "\u7a46\u8679", "\u6f58\u7acb\u521a", "\u9ece\u706b\u8f89", "\u96d2\u6811\u521a", "\u51b7\u6eb6", "\u6c6a\u6d0b", "\u6c6a\u6c38\u6e05", "\u6c88\u91d1\u9f99", "\u6c88\u6653\u660e", "\u6c88\u8dc3\u8dc3", "\u6c88\u5fb7\u548f", "\u6000\u8fdb\u9e4f", "\u5b8b\u4e39", "\u5b8b\u6d9b", "\u5b8b\u79c0\u5ca9", "\u5f20\u519b", "\u5f20\u53c8\u4fa0", "\u5f20\u5347\u6c11", "\u5f20\u5e86\u4f1f", "\u5f20\u5e86\u9ece", "\u5f20\u7eaa\u5357", "\u5f20\u56fd\u6e05", "\u5f20\u6625\u8d24", "\u5f20\u6653\u660e", "\u5f20\u88d4\u70af", "\u9646\u660a", "\u9648\u5e0c", "\u9648\u6b66", "\u9648\u8c6a", "\u9648\u6587\u6e05", "\u9648\u5409\u5b81", "\u9648\u5168\u56fd", "\u9648\u6c42\u53d1", "\u9648\u5b9d\u751f", "\u9648\u6da6\u513f", "\u9648\u654f\u5c14", "\u52aa\u5c14\u5170\u00b7\u963f\u4e0d\u90fd\u6ee1\u91d1", "\u82d7\u5729", "\u82d7\u534e", "\u82df\u4ef2\u6587", "\u8303\u9a81\u9a8f", "\u6797\u94ce", "\u5c1a\u5b8f", "\u91d1\u58ee\u9f99", "\u5468\u5f3a", "\u5468\u4e9a\u5b81", "\u90d1\u548c", "\u90d1\u536b\u5e73", "\u90d1\u6653\u677e", "\u5b5f\u7965\u950b", "\u8d75\u4e50\u9645", "\u8d75\u514b\u5fd7", "\u8d75\u5b97\u5c90", "\u90dd\u9e4f", "\u80e1\u548c\u5e73", "\u80e1\u6cfd\u541b", "\u80e1\u6625\u534e", "\u54b8\u8f89", "\u949f\u5c71", "\u4fe1\u6625\u9e70", "\u4faf\u5efa\u56fd", "\u5a04\u52e4\u4fed", "\u6d1b\u6851\u6c5f\u6751", "\u9a86\u60e0\u5b81", "\u79e6\u751f\u7965", "\u8881\u5bb6\u519b", "\u8881\u8a89\u67cf", "\u8881\u66d9\u5b8f", "\u8042\u8fb0\u5e2d", "\u6817\u6218\u4e66", "\u94b1\u5c0f\u828a", "\u94c1\u51dd", "\u502a\u5cb3\u5cf0", "\u5f90\u9e9f", "\u5f90\u4e50\u6c5f", "\u5f90\u5b89\u7965", "\u9ad8\u6d25", "\u90ed\u58f0\u7428", "\u90ed\u6811\u6e05", "\u5510\u4ec1\u5065", "\u9ec4\u660e", "\u9ec4\u5b88\u5b8f", "\u9ec4\u5764\u660e", "\u9ec4\u6811\u8d24", "\u66f9\u5efa\u660e", "\u9f9a\u6b63", "\u76db\u658c", "\u96ea\u514b\u6765\u63d0\u00b7\u624e\u514b\u5c14", "\u9102\u7adf\u5e73", "\u9e7f\u5fc3\u793e", "\u8c0c\u8d3b\u7434", "\u5f6d\u6e05\u534e", "\u848b\u8d85\u826f", "\u97e9\u6b63", "\u97e9\u536b\u56fd", "\u97e9\u957f\u8d4b", "\u5085\u653f\u534e", "\u8c22\u4f0f\u77bb", "\u697c\u9633\u751f", "\u8521\u5947", "\u8521\u540d\u7167"],
        // lanes = lanes.slice(0,5)
        laneLength = lanes.length,
        // items = resume.slice(0,5)
        items = resume
        timeBegin = 1953,
        timeEnd = 2018;

        var m = [0, 15, 15, 120], //top right bottom left
            w = 890 - m[1] - m[3],
            h = 2550 - m[0] - m[2],
            miniHeight = 20,
            mainHeight = laneLength * 12 + 50;

        //scales
        var x = d3.scaleLinear()
                .domain([timeBegin, timeEnd])
                .range([0, w]);
        var x1 = d3.scaleLinear()
            .domain([timeBegin, timeEnd])
                .range([0, w]);
        var y1 = d3.scaleLinear()
                .domain([0, laneLength])
                .range([0, mainHeight]);
        var y2 = d3.scaleLinear()
                .domain([0, laneLength])
                .range([0, miniHeight]);

        var chart = d3.select("#timeline").select("#timeline_svg")
                    .attr("width", w + m[1] + m[3])
                    .attr("height", h + m[0] + m[2])
                    .attr("class", "chart");
                    
        
        chart.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", w)
            .attr("height", mainHeight);

        var main = chart.append("g")
                    .attr("transform", "translate(" + m[3] + ","+ (miniHeight + m[0]) + ")")
                    .attr("width", w)
                    .attr("height", mainHeight)
                    .attr("class", "main");

        var mini = chart.append("g")
                    .attr("transform", "translate(" + m[3] + "," +  m[0] + ")")
                    .attr("width", w)
                    .attr("height", miniHeight)
                    .attr("class", "mini");
        
        //main lanes and texts
        main.append("g").selectAll(".laneLines")
            .data(items)
            .enter().append("line")
            .attr("x1", m[1])
            .attr("y1", function(d) {return y1(d.id);})
            .attr("x2", w)
            .attr("y2", function(d) {return y1(d.id);})
            .attr("stroke", "lightgray")

        main.append("g").selectAll(".laneText")
            .data(lanes)
            .enter().append("text")
            .text(function(d) {return d;})
            .attr("x", -m[1])
            .attr("y", function(d, i) {return y1(i + .5);})
            .attr("dy", ".5ex")
            .attr("text-anchor", "end")
            .attr("class", "laneText");

        mini.append("g")
            .append("rect")
            .attr("x",-58.5)
            .attr("y",0)
            .attr("width",60)
            .attr("height",miniHeight-5)
            .attr("fill","balck")
            
        mini.append("text")
            .attr("x",-45)
            .attr("y",11)
            .text("BRUSH")
            .attr("font-size","20")
            .attr("fill","white")
        
        
        //mini lanes and texts
        // mini.append("g").selectAll(".laneLines")
        //     .data(items)
        //     .enter().append("line")
        //     .attr("x1", m[1])
        //     .attr("y1", function(d) {return y2(d.lane);})
        //     .attr("x2", w)
        //     .attr("y2", function(d) {return y2(d.lane);})
        //     .attr("stroke", "lightgray");

        // mini.append("g").selectAll(".laneText")
        //     .data(lanes)
        //     .enter().append("text")
        //     .text(function(d) {return d;})
        //     .attr("x", -m[1])
        //     .attr("y", function(d, i) {return y2(i + .5);})
        //     .attr("dy", ".5ex")
        //     .attr("text-anchor", "end")
        //     .attr("class", "laneText");

        var itemRects = main.append("g")
                            .attr("clip-path", "url(#clip)");
        
        //mini item rects
        // mini.append("g").selectAll("miniItems")
        //     .data(items)
        //     .enter().append("rect")
        //     .attr("class", function(d) {return "miniItem" + d.id;})
        //     .attr("x", function(d) {return x(d.start);})
        //     .attr("y", function(d) {return y2(d.id + .5) - 5;})
        //     .attr("width", function(d) {return x(d.end - d.start);})
        //     .attr("height", 10);
        mini.append("g")
            .append("rect")
            .attr("width", w)
            .attr("height", miniHeight-5)
            .attr("fill","gray");
        mini.append("text")
            .attr("x",0)
            .attr("y",11)
            .text("1960")
            .attr("font-size","20")
            .attr("fill","white")
        mini.append("text")
            .attr("x",w-25)
            .attr("y",11)
            .text("2018")
            .attr("font-size","20")
            .attr("fill","white")


        //mini labels
        // mini.append("g").selectAll(".miniLabels")
        //     .data(items)
        //     .enter().append("text")
        //     .text(function(d) {return d.id;})
        //     .attr("x", function(d) {return x(d.start);})
        //     .attr("y", function(d) {return y2(d.id + .5);})
        //     .attr("dy", ".5ex");

        //brush
        var brush = d3.brushX()
            .extent([[0,0],[w,miniHeight-5]])
            .on("brush", display);

        mini.append("g")
            .attr("class", "x brush")
            .call(brush)
            .selectAll("rect")
            .attr("y", 1)
            .attr("height", miniHeight - 1);

        display();
    
        function display() {
            var rects, labels;
            var s;
            // var sx = [timeBegin, timeEnd];
            var minExtent = timeBegin;
            var maxExtent = timeEnd;
            var color = [d3.rgb(233,150,122),d3.rgb(85,107,47),d3.rgb(119,136,153)];
            // console.log(s)
            visItem = items.filter(function(d){return 1; });
            if(d3.event == null){
                visItem = items.filter(function(d){return 1; })
            }else{
                s = d3.event.selection;
                sx = s.map(x.invert);
                minExtent = s.map(x.invert)[0];
                maxExtent = s.map(x.invert)[1];
            }
            visItems = items.filter(function(d) {return d.start < maxExtent && d.end > minExtent;});

            mini.select(".brush")
                .call(brush);

            x1.domain([minExtent, maxExtent]);

            //update main item rects
            rects = itemRects.selectAll("rect")
                .data(visItems, function(d) { return d.id; })
                .attr("x", function(d) {return x1(d.start);})
                .attr("width", function(d) {return x1(d.end) - x1(d.start);});
            
            rects.enter().append("rect")
                // .attr("class", function(d) {return "miniItem" + d.id;})
                .attr("x", function(d) {return x1(d.start);})
                .attr("y", function(d) {return y1(d.id) +2;})
                .attr("width", function(d) {return x1(d.end) - x1(d.start);})
                .attr("height", function(d) {return .8 * y1(1);})
                .attr("fill",function(d,i){return color[i%3]})
                .append('title')
                .text(function(d) {
                    return d.start+"-"+d.end+":"+d.name+","+d.info;
                });

            rects.exit().remove();

            //update the item labels
            // labels = itemRects.selectAll("text")
            //     .data(visItems, function (d) { return d.id; })
            //     .attr("x", function(d) {return x1(Math.max(d.start, minExtent) + 2);});

            // labels.enter().append("text")
            //     .text(function(d) {return d.start.slice(-2)+"-"+d.end.slice(-2);})
            //     .attr("x", function(d) {return x1(Math.max((d.start), minExtent));})
            //     .attr("y", function(d) {return y1(d.id)+15;})
            //     .attr("text-anchor", "start");

            // labels.exit().remove();

        }
    })		
}
function drawBar(){
    // set the dimensions and margins of the graph
    var margin = {top: 100, right: 0, bottom: 0, left: 0},
        width = 500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        innerRadius = 70,
        outerRadius = Math.min(width, height) / 2;   // the outerRadius goes from the middle of the SVG area to the border

    // append the svg object
    var svg = d3.select("#bar")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + (width / 2 + margin.left-50) + "," + (height / 2 + margin.top-100) + ")");

    d3.csv("data/major_cnt.csv", function(data) {
        console.log(data)
        d3.csv("data/7_OneCatOneNum.csv",function(major){
            console.log(major);
            console.log(major[1]);
        })

        // Scales
        var x = d3.scaleBand()
            .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
            .align(0)                  // This does nothing
            .domain(data.map(function(d) { return d.major; })); // The domain of the X axis is the list of states.
        var y = d3.scaleRadial()
            .range([innerRadius, outerRadius])   // Domain will be define later.
            .domain([0, 30]); // Domain of Y is from 0 to the max seen in the data

        // Add the bars
        svg.append("g")
        .selectAll("path")
        .data(data)
        .enter()
        .append("path")
            .attr("fill", "#69b3a2")
            .attr("d", d3.arc()     // imagine your doing a part of a donut plot
                .innerRadius(innerRadius)
                .outerRadius(function(d) { return y(d.cnt); })
                .startAngle(function(d) { return x(d.major); })
                .endAngle(function(d) { return x(d.major) + x.bandwidth(); })
                .padAngle(0.01)
                .padRadius(innerRadius))
                .append('title')
                .text(function(d) {
                    return d.major+":"+d.cnt;
                });

        // Add the labels
        svg.append("g")
            .selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("text-anchor", function(d) { return (x(d.major) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
            .attr("transform", function(d) { return "rotate(" + ((x(d.major) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d.cnt)+10) + ",0)"; })
            .append("text")
            .text(function(d){return(d.major)})
            .attr("transform", function(d) { return (x(d.major) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
            .style("font-size", "7px")
            .attr("alignment-baseline", "middle")

    });
}

function drawlink(){
    var diameter = 550,
    radius = diameter / 2,
    innerRadius = radius - 120;

var cluster = d3.cluster()
    .size([360, innerRadius]);

var line = d3.radialLine()
    .curve(d3.curveBundle.beta(0.85))
    .radius(function(d) { return d.y; })
    .angle(function(d) { return d.x / 180 * Math.PI; });

var svg = d3.select("#link").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .append("g")
    .attr("transform", "translate(" + 200 + "," + 200 + ")");

var link = svg.append("g").selectAll(".link"),
    node = svg.append("g").selectAll(".node");

d3.json("data/flares.json", function(error, classes) {
  if (error) throw error;

  var root = packageHierarchy(classes)
      .sum(function(d) { return d.size; });

  cluster(root);

  link = link
    .data(packageImports(root.leaves()))
    .enter().append("path")
      .each(function(d) { d.source = d[0], d.target = d[d.length - 1]; })
      .attr("class", "link")
      .attr("d", line)
      .append('title')
      .text(function(d) {
          return d;
      });

  node = node
    .data(root.leaves())
    .enter().append("text")
      .attr("class", "node")
      .attr("dy", "0.31em")
      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)"); })
      .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
      .text(function(d) { return d.data.key; })
      .append('title')
      .text(function(d) {
          console.log(d)
          return d;
      });
});

// Lazily construct the package hierarchy from class names.
function packageHierarchy(classes) {
  var map = {};

  function find(name, data) {
    var node = map[name], i;
    if (!node) {
      node = map[name] = data || {name: name, children: []};
      if (name.length) {
        node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
        node.parent.children.push(node);
        node.key = name.substring(i + 1);
      }
    }
    return node;
  }

  classes.forEach(function(d) {
    find(d.name, d);
  });

  return d3.hierarchy(map[""]);
}

// Return a list of imports for the given array of nodes.
function packageImports(nodes) {
  var map = {},
      imports = [];

  // Compute a map from name to node.
  nodes.forEach(function(d) {
    map[d.data.name] = d;
  });

  // For each import, construct a link from the source to target node.
  nodes.forEach(function(d) {
    if (d.data.imports) d.data.imports.forEach(function(i) {
      imports.push(map[d.data.name].path(map[i]));
    });
  });

  return imports;
}
}
drawMap();
drawTimeLine();
drawBar();
drawlink();