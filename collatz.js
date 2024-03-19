
///************************************************************ Notes */
/* We need to point the lower and the highest number in the hailstone numbers that results of the Collatz sequence */

/* Numbers */
const numbersArray = [ 1,2,3,4,5,6,7,8,9,5246080434300675763500263534575670089 ] 

/*   5246080434300675763500263534575670089   */

const imgsArr = [
	'./img/numbers/1.png',
	'./img/numbers/2.png',
	'./img/numbers/3.png',
	'./img/numbers/4.png',
	'./img/numbers/5.png',
	'./img/numbers/6.png',
	'./img/numbers/7.png',
	'./img/numbers/8.png',
	'./img/numbers/9.png'
];

const ulElementID = document.getElementById('main-container');

ulElementID.classList.add('container-fluid', 'd-block');
ulElementID.innerHTML = "<div class='d-flex justify-content-between align-items-center m-0'><div class='circleIMG d-none'></div><h1 class='mx-4 collTXT'>The Collatz sequence</h1>  <div class='stage'><figure class='ball bubble '></figure></div> </div> <hr> <h3 class='m-4'>Choose a number</h3>";


const cleanView = () => {
    ulElementID.innerHTML = '';
};

 /* Create HTML DOM elements */
const liElement = document.createElement('div');
liElement.classList.add('d-flex', 'justify-content-center', 'buttonsBox', 'px-3');
ulElementID.appendChild(liElement);

const ulElement = document.querySelector('.buttonsBox');

// const buttonElement = document.createElement('button');
// buttonElement.classList.add('btn', 'btn-light', 'border', 'btnNumberClass');
// buttonElement.setAttribute('type', 'submit');

const renderElementList = (element, index) => {
  for( var i = 0; i <= numbersArray.length-1; i++ ){
	 ulElement.innerHTML +=  `<button class='btn btn-light w-100 m-1 w-special bigTXT'> ${ BigInt( numbersArray[ i ]) } </button>`
	}
	ulElementID.innerHTML += "<h3 class='m-4'>Hailstone numbers</h3><div class='container-fluid p-3'> <div class='row p-3'><div class='col-md-3'><div class='numberArtBoxVar '></div></div><div class='col-md-9'><div id='my_dataviz'></div></div></div>"
};renderElementList()



//************************************************************ Create the hailstone numbers array */

let hailstoneNumbersArr = [ ]

let numberArtBoxVar = document.querySelector('.numberArtBoxVar');
let numberImgD = document.createElement('img');

numberImgD.classList.add("w-100", "onlyF")
numberArtBoxVar.appendChild(numberImgD)


var buttonss = document.querySelectorAll('.bigTXT');

buttonss.forEach( function(i){
	i.addEventListener("click", function(e){

		numberArtBoxVar.innerHTML = " "

		let numberVal = e.target.innerHTML
		let selectedNumberTonum = Number( numberVal )

		for( let ix = 0; ix < imgsArr.length ; ix++ ){

			if( selectedNumberTonum===(ix+1) ){

				 numberArtBoxVar.innerHTML = "<img class='flowerImg' src='"+ imgsArr[ix] +"' >"

			}else if ( 
          selectedNumberTonum > 9 
      ){
        numberArtBoxVar.innerHTML = "<img class='flowerImg' src='./img/colnum.png' >"
      }
		}


		hailstoneNumbersArr = []
		hailstoneNumbersArr.push( selectedNumberTonum );

		for( let iColl = 0; iColl < hailstoneNumbersArr.length; iColl++ ){

			if( primeNumbersClass( selectedNumberTonum )===true ){
				selectedNumberTonum = ( selectedNumberTonum* 3 )+1
				hailstoneNumbersArr.push( selectedNumberTonum );

			}if( primeNumbersClass( selectedNumberTonum )===false ){
				selectedNumberTonum =( selectedNumberTonum/2 )
				hailstoneNumbersArr.push( selectedNumberTonum );

			}if( selectedNumberTonum ===2 ){
				selectedNumberTonum = ( selectedNumberTonum/2 )
				hailstoneNumbersArr.push( selectedNumberTonum );

				if( ( hailstoneNumbersArr[hailstoneNumbersArr.length-1] + 
              hailstoneNumbersArr[hailstoneNumbersArr.length-2] + 
              hailstoneNumbersArr[hailstoneNumbersArr.length-3] ) === 7 
          ){
					break
				}
			}if( selectedNumberTonum ===1 ){
				selectedNumberTonum=( selectedNumberTonum*3 )+1
				hailstoneNumbersArr.push(selectedNumberTonum);

				// if( (hailstoneNumbersArr[hailstoneNumbersArr.length-1]) === 1 ){
					
				// }
			}
		}

		// console.log(hailstoneNumbersArr);

		let imgArtBoxVar = document.querySelector('.flowerImg');

		var artFloerImgVar = d3.select(".flowerImg").style("transform","translateY(100px)").style("border","none");

		artFloerImgVar.transition().duration(400).style("transform","translateY(0px)").style("border","2px solid white");

		    // console.log( hailstoneNumbersArr )
    console.log( hailstoneNumbersArr );

		drawScatterplot( hailstoneNumbersArr )

	})
}) /* END buttonss.forEach Get number images */ 




//************************************************************ check if the selected number it's a prime number */
function primeNumbersClass(numberIn){
	for( let i = 2; i < numberIn; i++ ){
		if(numberIn % i === 0){
			return false;
		}else{
			return numberIn > 1;
		}
	}	
}
//************************************************************ Get Maximum Element of an array */
function getmaxValArr(arrayFrom){
	let maxElement = arrayFrom[0];
	for (let i = 1; i < arrayFrom.length; ++i) {
	    if (arrayFrom[i] > maxElement) {
	        maxElement = arrayFrom[i];
	    }
	}
	return maxElement
}

//************************************************************ Get Quotes */
function randomQuote() {
  $.ajax({
      url: "https://api.forismatic.com/api/1.0/?",
      dataType: "jsonp",
      data: "method=getQuote&format=jsonp&lang=en&jsonp=?",
      success: function( response ) {
        $("#random_quote").html("<p id='random_quote' class='lead text-center'>" +
          response.quoteText + "<br/>&dash; " + response.quoteAuthor + " &dash;</p>");
      }
  });
}

function tweenDash() {
	var l = this.getTotalLength(),
	i = d3.interpolateString("0," + l, l + "," + l);
	return function (t) { return i(t); };
}

function transition(selection) {
	selection.each(function(){
    d3.select(this).transition()
			.duration(2000)
			.attrTween("stroke-dasharray", tweenDash);
  })
}

//************************************************************ D3 Chart config */
function drawScatterplot( arrayFrom ){
	d3.select(".chart").remove();

    var outerWidth = parseInt( d3.select("#my_dataviz").style("width") );
    let outerHeight = parseInt( d3.select("#my_dataviz").style("height") );

    var margin = {top: 10, right: 30, bottom: 60, left: 80 };

    let width = outerWidth - margin.left - margin.right;
    let height = outerHeight - margin.top - margin.bottom;
    var innerWidth = outerWidth - margin.left - margin.right;
    let innerHeight = outerHeight - margin.top - margin.bottom;

  // Scales
  var xScale = d3.scaleLinear().domain([0, arrayFrom.length])
    .range([ 0, innerWidth ]);

  let yScale = d3.scaleLinear().domain([0, getmaxValArr(arrayFrom) ])
    .range([ innerHeight, 0]);

var renderGraph = function(data){
    // Set the zoom and Pan features: how much you can zoom, on which part, and what to do when there is a zoom
    var zoom = d3
      .zoom()
      .on("zoom", zoomed);

    let zoomG

    // append the SVG object to the body of the page
    var SVG = d3
      .select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right )
      .attr("height", height + margin.top + margin.bottom )
      .attr("class", "chart").style("transform","translateX(110px)")
      .call(zoom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      d3.select(".chart").transition().duration(400).style("transform","translateX(0px)")

      let innerG = d3.select(".chart")

      // Define the div for the tooltip
      var div = d3.select("body").append("div")
        .attr("class", "tooltip p-0 border sahdow")       
        .style("opacity", 0);

    var x0 = [0, arrayFrom.length];
    var y0 = [0, getmaxValArr(arrayFrom) ];

    var x = d3.scaleLinear().domain(x0)
          .range([ 0, innerWidth ]);

    var y = d3.scaleLinear().domain(y0)
          .range([ innerHeight, 0]);


    var newX = x;
    var newY = y;

    var brush = d3
        .brush()
        .extent([[0, 0], [width, height]])
        .on("end", brushended),
      idleTimeout,
      idleDelay = 350;


    // Add X axis
    var xAxis = SVG.append("g")
      .attr("class", "x axis")
      .attr("id", "axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call( d3.axisBottom(xScale).ticks( Math.max(innerWidth/50, 2) ));

    // Add Y axis
    var yAxis = SVG.append("g")
        .attr("class", "axis y")
        .attr("transform", "translate(" + -10 + ",0)")
        .call(d3.axisLeft(yScale).ticks( Math.max(innerHeight/50, 2) ) )
      .attr("id", "axis--y")


    // Add a clipPath: everything out of this area won't be drawn.
    var clip = SVG.append("defs")
      .append("SVG:clipPath")
      .attr("id", "clip")
      .append("SVG:rect")
      .attr("width", innerWidth+50)
      .attr("height", innerHeight+10)
      .attr("x", 0)
      .attr("y", -10);

    // Create the scatter variable: where both the circles and the brush take place
    var scatter = SVG.append("g").attr("clip-path", "url(#clip)").attr("id", "zoomG");

    function updateChart(newX, newY) {
      var t = SVG.transition().duration(750);

      // update axes with these new boundaries
      xAxis.transition(t).call(d3.axisBottom(newX));
      yAxis.transition(t).call(d3.axisLeft(newY));

      // update circle position
      scatter
        .selectAll("circle")
        .transition(t)
        .attr("cx", function(d,i){ let nextOne = i+1; return newX(nextOne); })
        .attr("cy", function(d) { return newX(d); })
    }

    // now the user can zoom and it will trigger the function called updateChart
    // A function that updates the chart when the user zoom and thus new boundaries are available
    function zoomed(d) {
      // console.log(hailstoneNumbersArr);
      // recover the new scale
      newX = d3.event.transform.rescaleX(x);
      newY = d3.event.transform.rescaleY(y);

      // update axes with these new boundaries
      xAxis.call(d3.axisBottom(newX));
      yAxis.call(d3.axisLeft(newY));

      // update circle position
      zoomG
        .selectAll(".dot")
        .data(hailstoneNumbersArr)
        .attr("cx", function(d,i){ let nextOne = i+1; return newX(nextOne); })
        .attr("cy", function(d) { return newY(d) })

      scatter.selectAll("path")
      .datum(hailstoneNumbersArr)
      .attr("d", d3.line()
        .x( function(d,i){ let nextOne = i+1; return newX(nextOne) })
        .y( function(d){ return newY(d) })
      )
    }

    function idled() {
      idleTimeout = null;
    }

    function brushended() {
      var s = d3.event.selection;

      if (!s) {
        if (!idleTimeout) return (idleTimeout = setTimeout(idled, idleDelay));
        newX = x.domain(x0);
        newY = y.domain(y0);
      } else {
        newX = x.domain([s[0][0], s[1][0]].map(newX.invert));
        newY = y.domain([s[1][1], s[0][1]].map(newY.invert));

        SVG.select(".brush").call(brush.move, null);
      }
      updateChart(newX, newY);
    }

    function end_brush_tool() {
      SVG.selectAll("g.brush").remove();
    }

    function start_brush_tool() {
      SVG.append("g")
        .attr("class", "brush")
        .call(brush);
    }

    function end_brush_tool() {
      SVG.selectAll("g.brush").remove();
    }

    var tooltip = d3
      .select("#dataviz_axisZoom")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);



    function reset_zoom() {
      newX = x.domain(x0);
      newY = y.domain(y0);

      updateChart(newX, newY);
    }

 // Set line on graph
    scatter.append("path")
      .datum(hailstoneNumbersArr)
      .transition()
       .duration(200)
      .attr("class", "lineX")
      .attr("fill", "none")
      .attr("stroke", "gray")
      .attr("stroke-width", 1)
      .attr("d", d3.line()
        .x( function(d,i){ let nextOne = i+1; return xScale(nextOne) })
        .y( function(d){ return yScale(d) })
      )

    // transition( d3.selectAll("path") )


    zoomG = d3.select("#zoomG").append("g").attr("id", "cG");

    // var circlesForChildren = innerG.append("g")
    // .attr("id", "circlesBox")

    zoomG.selectAll(".dot")
      .data( hailstoneNumbersArr )
      .enter()
      .append("circle")
      // .transition()
      //   .duration(200)
        .attr("class", "dot")
        .attr("r", 0)
        .attr("cx", function(d,i){ 
          let nextOne = i+1; return x( nextOne ); 
        })
        .attr("cy", function(d) { return y( d ); })
        // .style("fill", function(d){})
        .on("mouseover", function(d) {
          let toolTipContent = document.querySelector('.quotesDiv');
          randomQuote()

            div.transition()
                // .duration(200)
                .style("opacity", 1);   

            div.html("<div class='quotesDiv bg-white position-relative d-block'><div class='custom-number '>"+d+"</div><p class='w-100 h-100 bg-white position-relative p-2 m-0 ' id='random_quote'></p> " )
                .style("left", (d3.event.pageX - 90) + "px")
                .style("top", (d3.event.pageY + 10) + "px");  
        })          
        .on("mouseout", function(d) {
          let toolTipContent = document.querySelector('.quotesDiv');
          div.transition()
                // .duration(100)
                .style("opacity", 0); 
            toolTipContent.innerHTML =''
        })


      // Add xAxis Title
      innerG.append("text")
          .attr("class", "axisTitle x")
          .attr("x", innerWidth / 2)
          .attr("y", innerHeight + (margin.bottom))
          .style("text-anchor", "middle")
          .text("Hailstone numbers position");

      // Add yAxi Title
      innerG.append("text")
          .attr("class", "axisTitle y")
          .attr("transform", "rotate(-90)")
          .attr("x", -innerHeight / 2)
          .attr("y", -margin.left + 90)
          .style("text-anchor", "middle")
          .text("Value");


        var circlesInsideAll = document.querySelectorAll('.dot');
        var circlesLength = circlesInsideAll.length

        console.log(circlesLength)

        const childOne = document.querySelector('#zoomG circle:nth-child('+(circlesLength-2)+')');
        const childTwo = document.querySelector('#zoomG circle:nth-child('+(circlesLength-1)+')');
        const childThree = document.querySelector('#zoomG circle:nth-child('+circlesLength+') ');

        circlesInsideAll.forEach((element) => {
          element.classList.add('circlesGray', 'd-block');
        });

        childOne.classList.add('fillOne', 'd-block');
        childTwo.classList.add('fillTwo', 'd-block');
        childThree.classList.add('fillThree', 'd-block');

        scatter.selectAll(".dot")
            .transition().delay(function(d,i) {return i * 40}).attr("r", 7)

} /* END var renderGraph = function(data) */
  

  function resize(){

    let innerGR = d3.select(".chart")
    // Reset chart dimentions
    outerWidth = parseInt(d3.select("#my_dataviz").style("width"));
    outerHeight = parseInt(d3.select("#my_dataviz").style("height"));
    innerWidth = outerWidth - margin.left - margin.right;
    innerHeight = outerHeight - margin.top - margin.bottom;

    // Update the range of the scales
    xScale.rangeRound([0, innerWidth]);
    yScale.rangeRound([innerHeight, 0]);


    // Update axis with new scale
    innerGR.select(".axis.x")
        .attr("transform", "translate(0," + (innerHeight + 4) + ")")
        .call(d3.axisBottom(xScale).ticks(Math.max(innerWidth/50, 2)));
    innerGR.select(".axis.y")
        .call(d3.axisLeft(yScale).ticks(Math.max(innerHeight/50, 2)));
    
    // Update axis title positions
    innerGR.select(".axisTitle.x")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + (margin.bottom - 10));
    innerGR.select(".axisTitle.y")
        .attr("x", -innerHeight / 2);

     // Recalc new position of dots   
    innerGR.selectAll(".dot")
        .attr("cx", function(d,i) { let nextOne = i+1; return xScale(nextOne); })
        .attr("cy", function(d) { return yScale(d); });

    innerGR.selectAll(".lineX")
         .attr("d", d3.line()
    		.x( function(d,i) {let nextOne = i+1; return xScale(nextOne); })
    		.y( function(d) { return yScale(d); })
     )

  } /* END var renderGraph = function(data) */
  
  //************************************************************ Get data from hailstoneNumbersArr */
  renderGraph(hailstoneNumbersArr);
  
  d3.select(window).on("resize", resize);

}/* END drawScatterplot( arrayFrom ) */


$(window).mousemove(function (e) {
  let rect = $("#eyeball")[0].getBoundingClientRect();
  let deltaX = e.clientX - rect.left;
  if (deltaX < -30) {
    deltaX = -30;
  }
  if (deltaX > 30) {
    deltaX = 30;
  }
  let deltaY = e.clientY - rect.top;
  if (deltaY < -15) {
    deltaY = -15;
  }
  if (deltaY > 15) {
    deltaY = 15;
  }
  $("#eyeball").css(
    "transform",
    `translate3d(${deltaX}px, ${deltaY}px, 0)`
  );
  $("#pupill").css(
    "transform",
    `translate3d(${deltaX/3}px, ${deltaY/3}px, 0)`
  );
});


$(".allBox").mousemove(function (e) {
  let rect = $("#eyeball2")[0].getBoundingClientRect();
  let deltaX = e.clientX - rect.left;
  if (deltaX < -30) {
    deltaX = -30;
  }
  if (deltaX > 30) {
    deltaX = 30;
  }
  let deltaY = e.clientY - rect.top;
  if (deltaY < -15) {
    deltaY = -15;
  }
  if (deltaY > 15) {
    deltaY = 15;
  }
  $("#eyeball2").css(
    "transform",
    `translate3d(${deltaX}px, ${deltaY}px, 0)`
  );
  $("#pupill2").css(
    "transform",
    `translate3d(${deltaX/3}px, ${deltaY/3}px, 0)`
  );
});




 //************************************************************ Get data from hailstoneNumbersArr */
$(document).ready(function ($) {
  //Items
  var $card = $(".card360");
  var $container = $(".container360");
  var $title = $(".title");
  var $bike = $(".bike img");
  var $purchase = $(".purchase");
  var $description = $(".info h3");

  //Moving Animation Event
  $container.on("mousemove", function (e) {
    let xAxis = (window.innerWidth / 2 - e.clientX) / 25;
    let yAxis = (window.innerHeight / 2 - e.clientY) / 25;
    $card.css("transform", `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`);
  });

  //Animate on Hover
  $container.hover(function () {
    // $card.toggleClass("has-transform");
    // $title.toggleClass("has-transform");
    // $bike.toggleClass("has-transform");
    // $purchase.toggleClass("has-transform");
    // $description.toggleClass("has-transform");
  });

  //Pop Back on mouseleave
  $container.on("mouseleave", function () {
    $card.css("transform", `rotateY(0deg) rotateX(0deg)`);
  });
});

const startBtn = document.querySelector('#startBtn');
const startScreen = document.querySelector('.allBox');
const justFF = document.querySelector('.coded');
startBtn.addEventListener("click", function(e){
  startScreen.remove() 
  justFF.remove() 
})





