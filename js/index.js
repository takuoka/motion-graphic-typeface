


//TODO
//それぞれのオブジェクト描画するときに色を変えたい
//描画してるところを探す



var COLOR_CONFIG = {
	background_and_lines: {
		light: {
			background: "rgba(255,255,255,1)",
			line: {
				r: 0.0,
				g: 0.0,
				b: 0.0
			}
		},
		dark: {
			background: "rgba(0,0,0,1)",
			line: {
				r: 1.0,
				g: 1.0,
				b: 1.0
			}
		}
	},
	//文字に優しく影響する全体的な照明？
	ambientLight: {
		r : 1.0,
		g : 1.0,
		b : 1.0
	},
	//文字とかの色
	directionalLight:{
		r : 1.0,
		g : 1.0,
		b : 1.0
	}
}



CHAR_MAP = {
	'A': [[0,0,0,2,0],[0,0,2,5,0],[0,2,1,1,0],[0,1,3,5,0],[0,1,0,1,0]],
	'B': [[0,4,0,0,0],[0,3,3,4,0],[0,5,3,1,0],[0,5,2,1,0],[0,3,1,0,0]],
	'C': [[0,0,4,0,0],[0,2,1,4,0],[0,1,0,0,0],[0,3,4,1,0],[0,0,3,0,0]],
	'D': [[0,4,0,0,0],[0,3,3,4,0],[0,5,0,5,0],[0,5,2,1,0],[0,1,1,0,0]],
	'E': [[0,0,2,1,0],[0,2,1,0,0],[0,2,2,1,0],[0,5,0,2,0],[0,1,3,1,0]],
	'F': [[0,0,2,1,0],[0,2,1,0,0],[0,2,2,1,0],[0,5,0,0,0],[0,1,0,0,0]],
	'G': [[0,0,2,0,0],[0,2,1,0,0],[0,1,0,4,0],[0,3,2,1,0],[0,0,3,0,0]],
	'H': [[0,4,0,2,0],[0,5,0,1,0],[0,2,1,5,0],[0,5,0,5,0],[0,1,0,3,0]],
	'I': [[0,0,2,0,0],[0,0,2,0,0],[0,0,5,0,0],[0,0,5,0,0],[0,0,1,0,0]],
	'J': [[0,0,0,2,0],[0,0,0,5,0],[0,0,0,5,0],[0,4,2,1,0],[0,0,1,0,0]],
	'K': [[0,4,0,0,0],[0,4,0,2,0],[0,5,2,1,0],[0,5,0,4,0],[0,1,0,3,0]],
	'L': [[0,4,0,0,0],[0,5,0,0,0],[0,5,0,0,0],[0,3,0,0,0],[0,0,3,4,0]],
	'M': [[0,4,0,0,0],[0,5,4,4,0],[0,5,3,3,4],[0,3,0,0,3],[0,3,0,0,0]],
	'N': [[0,0,0,4,0],[0,4,0,5,0],[0,5,4,4,0],[0,5,3,5,0],[0,1,0,3,0]],
	'O': [[0,0,4,0,0],[0,2,1,4,0],[0,1,0,3,0],[0,3,4,1,0],[0,0,3,0,0]],
	'P': [[0,4,0,0,0],[0,5,3,4,0],[0,3,4,1,0],[0,5,0,0,0],[0,1,0,0,0]],
	'Q': [[0,0,4,0,0],[0,2,1,4,0],[0,1,2,3,0],[0,3,2,5,0],[0,0,3,0,0]],
	'R': [[0,4,0,0,0],[0,5,3,4,0],[0,3,4,1,0],[0,5,0,4,0],[0,1,0,3,0]],
	'S': [[0,0,0,4,0],[0,2,1,0,0],[0,0,3,4,0],[0,3,2,1,0],[0,0,1,0,0]],
	'T': [[0,2,5,1,0],[0,0,5,0,0],[0,0,5,0,0],[0,0,2,0,0],[0,0,1,0,0]],
	'U': [[0,0,0,4,0],[0,2,0,3,0],[0,5,0,5,0],[0,5,0,1,0],[0,3,1,0,0]],
	'V': [[0,0,0,2,0],[0,0,0,5,0],[0,4,0,2,0],[0,3,4,1,0],[0,0,3,0,0]],
	'W': [[0,2,0,0,0],[0,2,0,0,2],[0,5,2,2,1],[0,5,1,1,0],[0,1,0,0,0]],
	'X': [[0,0,0,2,0],[0,4,0,1,0],[0,3,2,0,0],[0,2,1,4,0],[0,1,0,3,0]],
	'Y': [[0,0,0,2,0],[0,4,0,1,0],[0,3,2,0,0],[0,0,5,0,0],[0,0,3,0,0]],
	'Z': [[0,0,0,0,0],[0,2,5,1,0],[0,0,2,1,0],[0,2,1,0,0],[2,5,1,1,0]],
	'.': [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,5,0,0,0]],
	',': [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,1,0,0,0]],
	'!': [[0,0,2,0,0],[0,0,5,0,0],[0,0,5,0,0],[0,0,1,0,0],[0,0,1,0,0]],
	'?': [[0,0,2,4,0],[0,0,0,2,0],[0,0,2,1,0],[0,0,1,0,0],[0,0,1,0,0]],
	'1': [[0,0,2,0,0],[0,0,5,0,0],[0,0,5,0,0],[0,0,5,0,0],[0,0,3,0,0]],
	'2': [[0,0,0,0,0],[0,0,3,4,0],[0,0,2,1,0],[0,2,1,0,0],[0,3,2,4,0]],
	'3': [[0,0,0,0,0],[0,0,3,4,0],[0,0,2,1,0],[0,0,2,1,0],[0,2,1,0,0]],
	'4': [[0,0,0,0,0],[0,0,2,1,0],[0,2,1,2,0],[0,3,2,5,0],[0,0,0,1,0]],
	'5': [[0,0,0,0,0],[0,0,2,1,0],[0,2,4,0,0],[0,0,3,4,0],[0,0,2,1,0]],
	'6': [[0,0,0,0,0],[0,2,1,0,0],[0,5,4,0,0],[0,3,0,4,0],[0,0,3,1,0]],
	'7': [[0,0,0,0,0],[0,2,1,5,0],[0,0,2,1,0],[0,2,1,0,0],[0,1,0,0,0]],
	'8': [[0,0,0,0,0],[0,0,2,4,0],[0,0,1,1,0],[0,2,3,4,0],[0,3,2,1,0]],
	'9': [[0,0,0,0,0],[0,2,1,4,0],[0,3,2,1,0],[0,2,1,0,0],[0,1,0,0,0]],
	'0': [[0,0,0,0,0],[0,0,2,4,0],[0,2,1,2,0],[0,1,2,1,0],[0,3,1,0,0]]
}



// FIRST_TITLE_FONT_MAP_ARRAY = [
// 	{//S
// 		center : {x:-3.5, y:0.15, z:0}, 
// 		map : [
// 		[0,0,0,4,0],
// 		[0,2,1,0,0],
// 		[0,0,3,4,0],
// 		[0,3,2,1,0],
// 		[0,0,1,0,0]],  
// 	},
// 	{//O
// 		center : {x:-2.5, y:0.15, z:0}, 
// 		map : [
// 		[0,0,4,0,0],
// 		[0,2,1,4,0],
// 		[0,1,0,3,0],
// 		[0,3,4,1,0],
// 		[0,0,3,0,0]],  
// 	},
// 	{//L
// 		center : {x:-1.5, y:0.15, z:0}, 
// 		map : [
// 		[0,4,0,0,0],
// 		[0,5,0,0,0],
// 		[0,5,0,0,0],
// 		[0,3,0,0,0],
// 		[0,0,3,4,0]],  
// 	},
// 	{//I
// 		center : {x:-0.8, y:0.15, z:0}, 
// 		map : [
// 		[0,0,2,0,0],
// 		[0,0,2,0,0],
// 		[0,0,5,0,0],
// 		[0,0,5,0,0],
// 		[0,0,1,0,0]],  
// 	},
// 	{//D
// 		center : {x:0, y:0.15, z:0}, 
// 		map : [
// 		[0,4,0,0,0],
// 		[0,3,3,4,0],
// 		[0,5,0,5,0],
// 		[0,5,2,1,0],
// 		[0,1,1,0,0]],  
// 	},
// 	{//C
// 		center : {x:1, y:-0.15, z:0}, 
// 		map : [
// 		[0,0,4,0,0],
// 		[0,2,1,4,0],
// 		[0,1,0,0,0],
// 		[0,3,4,1,0],
// 		[0,0,3,0,0]],  
// 	},
// 	{//E
// 		center : {x:2, y:-0.15, z:0}, 
// 		map : [
// 		[0,0,2,1,0],
// 		[0,2,1,0,0],
// 		[0,2,2,1,0],
// 		[0,5,0,2,0],
// 		[0,1,3,1,0]],  
// 	},
// 	{//L
// 		center : {x:3, y:-0.15, z:0}, 
// 		map : [
// 		[0,4,0,0,0],
// 		[0,5,0,0,0],
// 		[0,5,0,0,0],
// 		[0,3,0,0,0],
// 		[0,0,3,4,0]],  
// 	},
// 	{//L
// 		center : {x:3.6, y:-0.15, z:0}, 
// 		map : [
// 		[0,4,0,0,0],
// 		[0,5,0,0,0],
// 		[0,5,0,0,0],
// 		[0,3,0,0,0],
// 		[0,0,3,4,0]],  
// 	}
// ]


FIRST_TITLE_FONT_MAP_ARRAY = [
	{
		center : {x:-4 -0.0, y:0, z:0}, 
		map : CHAR_MAP['C'],  
	},
	{
		center : {x:-3 -0.0, y:0, z:0}, 
		map : CHAR_MAP['R'],  
	},
	{
		center : {x:-2 -0.0, y:0, z:0}, 
		map : CHAR_MAP['E'],  
	},
	{
		center : {x:-1 -0.0, y:0, z:0}, 
		map : CHAR_MAP['A'],  
	},
	{
		center : {x:0 -0.0, y:0, z:0}, 
		map : CHAR_MAP['T'],  
	},
	{
		center : {x:1 -0.0, y:0, z:0}, 
		map : CHAR_MAP['I'],  
	},
	{
		center : {x:2 -0.0, y:0, z:0}, 
		map : CHAR_MAP['O'],  
	},
	{
		center : {x:3 -0.0, y:0, z:0}, 
		map : CHAR_MAP['N'],  
	},
	{
		center : {x:4 -0.0, y:0, z:0}, 
		map : CHAR_MAP['!'],  
	},
	// {
	// 	center : {x:5 -0.3, y:0, z:0}, 
	// 	map : CHAR_MAP['N'],  
	// }
]


// SECOND_TITLE_FONT_MAP_ARRAY = [
// 	{//H
// 		center : {x:-3.5, y:0, z:0}, 
// 		map : [[0,4,0,2,0],[0,5,0,1,0],[0,2,1,5,0],[0,5,0,5,0],[0,1,0,3,0]]
// 	},
// 	{//A
// 		center : {x:-2.5, y:0, z:0}, 
// 		map : [[0,0,0,2,0],[0,0,2,5,0],[0,2,1,1,0],[0,1,3,5,0],[0,1,0,1,0]]
// 	},
// 	{//C
// 		center : {x:-1.5, y:0, z:0}, 
// 		map : [[0,0,4,0,0],[0,2,1,4,0],[0,1,0,0,0],[0,3,4,1,0],[0,0,3,0,0]]
// 	},
// 	{//K
// 		center : {x:-0.5, y:0, z:0}, 
// 		map : [[0,4,0,0,0],[0,4,0,2,0],[0,5,2,1,0],[0,5,0,4,0],[0,1,0,3,0]]
// 	},
// 	{//Y
// 		center : {x:1.0, y:0, z:0}, 
// 		map : [[0,0,0,2,0],[0,4,0,1,0],[0,3,2,0,0],[0,0,5,0,0],[0,0,3,0,0]]
// 	},
// 	{//O
// 		center : {x:2.0, y:0, z:0}, 
// 		map : [[0,0,4,0,0],[0,2,1,4,0],[0,1,0,3,0],[0,3,4,1,0],[0,0,3,0,0]]
// 	},
// 	{//U
// 		center : {x:3.0, y:0, z:0}, 
// 		map : [[0,0,0,4,0],[0,2,0,3,0],[0,5,0,5,0],[0,5,0,1,0],[0,3,1,0,0]]
// 	}
// ];



SECOND_TITLE_FONT_MAP_ARRAY = [
	{
		center : {x:-4 +0.5, y:0, z:0}, 
		map : CHAR_MAP['T'],  
	},
	{
		center : {x:-3 +0.5, y:0, z:0}, 
		map : CHAR_MAP['A'],  
	},
	{
		center : {x:-2 +0.5, y:0, z:0}, 
		map : CHAR_MAP['K'],  
	},
	{
		center : {x:-1 +0.5, y:0, z:0}, 
		map : CHAR_MAP['U'],  
	},
	{
		center : {x:0 +0.5, y:0, z:0}, 
		map : CHAR_MAP['.'],  
	},
	{
		center : {x:1 +0.5, y:0, z:0}, 
		map : CHAR_MAP['O'],  
	},
	{
		center : {x:2 +0.5, y:0, z:0}, 
		map : CHAR_MAP['K'],  
	},
	{
		center : {x:3 +0.5, y:0, z:0}, 
		map : CHAR_MAP['A'],  
	},
];










//----------------------------------- end of config ------------------------------





var light = {
	enableLight : true,
	ambientLight : {
		color : {
			r : COLOR_CONFIG.ambientLight.r,// 1.0
			g : COLOR_CONFIG.ambientLight.g,// 1.0
			b : COLOR_CONFIG.ambientLight.b// 1.0
		},
		intensity : 0.0
	},
	directionalLight : {
		degree : {
			x : 0,
			y : 0,
			z : 1
		},
		color : {
			r : COLOR_CONFIG.directionalLight.r,// 1.0
			g : COLOR_CONFIG.directionalLight.g,// 1.0
			b : COLOR_CONFIG.directionalLight.b// 1.0
		},
		intensity : 1.0
	}
};







var fontmap_firstTitle = function() {
	this.returnData = new Array();
	this.col = 80;
	this.row = 160;
	this.cellLength = 22;
	this.cellSpace = 22;
	for(var i=0; i<DEFIINE_instanceNum; i++) {
		this.returnData[i] = {
			shade : false,
			fill : false,
			stroke : false,
			fillColor: {r:1.0, g:1.0, b:1.0, a:1.0},
			strokeColor: {r:1.0, g:1.0, b:1.0, a:1.0},
			size: 0,
			position: {x:0, y:0, z:0},
			rotate: {x:0, y:0, z:0}
		};
	};
	// this.fontMapData = [
	// 	{//S
	// 		cellLength : this.cellLength,
	// 		cellSpace : this.cellSpace,
	// 		center : {x:this.col*-3.5, y:this.row*0.15, z:0}, 
	// 		map : [[0,0,0,4,0],[0,2,1,0,0],[0,0,3,4,0],[0,3,2,1,0],[0,0,1,0,0]],  
	// 		mapDataNum : 5*5*2,
	// 		colUnit : 5*2
	// 	},
	// 	{//O
	// 		cellLength : this.cellLength,
	// 		cellSpace : this.cellSpace,
	// 		center : {x:this.col*-2.5, y:this.row*0.15, z:0}, 
	// 		map : [[0,0,4,0,0],[0,2,1,4,0],[0,1,0,3,0],[0,3,4,1,0],[0,0,3,0,0]],  
	// 		mapDataNum : 5*5*2,
	// 		colUnit : 5*2
	// 	},
	// 	{//L
	// 		cellLength : this.cellLength,
	// 		cellSpace : this.cellSpace,
	// 		center : {x:this.col*-1.5, y:this.row*0.15, z:0}, 
	// 		map : [[0,4,0,0,0],[0,5,0,0,0],[0,5,0,0,0],[0,3,0,0,0],[0,0,3,4,0]],  
	// 		mapDataNum : 5*5*2,
	// 		colUnit : 5*2
	// 	},
	// 	{//I
	// 		cellLength : this.cellLength,
	// 		cellSpace : this.cellSpace,
	// 		center : {x:this.col*-0.8, y:this.row*0.15, z:0}, 
	// 		map : [[0,0,2,0,0],[0,0,2,0,0],[0,0,5,0,0],[0,0,5,0,0],[0,0,1,0,0]],  
	// 		mapDataNum : 5*5*2,
	// 		colUnit : 5*2
	// 	},
	// 	{//D
	// 		cellLength : this.cellLength,
	// 		cellSpace : this.cellSpace,
	// 		center : {x:this.col*0, y:this.row*0.15, z:0}, 
	// 		map : [[0,4,0,0,0],[0,3,3,4,0],[0,5,0,5,0],[0,5,2,1,0],[0,1,1,0,0]],  
	// 		mapDataNum : 5*5*2,
	// 		colUnit : 5*2
	// 	},
	// 	{//C
	// 		cellLength : this.cellLength,
	// 		cellSpace : this.cellSpace,
	// 		center : {x:this.col*1, y:this.row*-0.15, z:0}, 
	// 		map : [[0,0,4,0,0],[0,2,1,4,0],[0,1,0,0,0],[0,3,4,1,0],[0,0,3,0,0]],  
	// 		mapDataNum : 5*5*2,
	// 		colUnit : 5*2
	// 	},
	// 	{//E
	// 		cellLength : this.cellLength,
	// 		cellSpace : this.cellSpace,
	// 		center : {x:this.col*2, y:this.row*-0.15, z:0}, 
	// 		map : [[0,0,2,1,0],[0,2,1,0,0],[0,2,2,1,0],[0,5,0,2,0],[0,1,3,1,0]],  
	// 		mapDataNum : 5*5*2,
	// 		colUnit : 5*2
	// 	},
	// 	{//L
	// 		cellLength : this.cellLength,
	// 		cellSpace : this.cellSpace,
	// 		center : {x:this.col*3, y:this.row*-0.15, z:0}, 
	// 		map : [[0,4,0,0,0],[0,5,0,0,0],[0,5,0,0,0],[0,3,0,0,0],[0,0,3,4,0]],  
	// 		mapDataNum : 5*5*2,
	// 		colUnit : 5*2
	// 	},
	// 	{//L
	// 		cellLength : this.cellLength,
	// 		cellSpace : this.cellSpace,
	// 		center : {x:this.col*3.6, y:this.row*-0.15, z:0}, 
	// 		map : [[0,4,0,0,0],[0,5,0,0,0],[0,5,0,0,0],[0,3,0,0,0],[0,0,3,4,0]],  
	// 		mapDataNum : 5*5*2,
	// 		colUnit : 5*2
	// 	}
	// ];
	this.fontMapData = FIRST_TITLE_FONT_MAP_ARRAY;
	for (i in this.fontMapData) {
		this.fontMapData[i].cellLength = this.cellLength;
		this.fontMapData[i].cellSpace = this.cellSpace;
		this.fontMapData[i].center.x *= this.col
		this.fontMapData[i].center.y *= this.row
		this.fontMapData[i].mapDataNum = 5 * 5 * 2
		this.fontMapData[i].colUnit = 5 * 2
	}

	var lastMap = 0;
	for(var i=0; i<this.fontMapData.length; i++) {
		for(var j=0; j<this.fontMapData[i].map.length; j++) {
			for(var k=0; k<this.fontMapData[i].map[j].length; k++) {
				switch(this.fontMapData[i].map[j][k]) {
					case 0:
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].shade = false;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].fill = false;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].stroke = false;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].size = 0;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].position = {
							x : 0,
							y : 0,
							z : 0
						};
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].rotate = {x:0, y:0, z:0};
						break;
					case 1:
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].shade = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].fill = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].stroke = false;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].size = this.fontMapData[i].cellLength/2;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].position = {
							x : (parseInt(k)*this.fontMapData[i].cellSpace - this.fontMapData[i].map[j].length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.x,
							y : (-parseInt(j)*this.fontMapData[i].cellSpace - -this.fontMapData[i].map.length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.y,
							z : this.fontMapData[i].center.z
						};
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].rotate = {x:0, y:0, z:180};
						break;
					case 2:
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].shade = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].fill = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].stroke = false;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].size = this.fontMapData[i].cellLength/2;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].position = {
							x : (parseInt(k)*this.fontMapData[i].cellSpace - this.fontMapData[i].map[j].length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.x,
							y : (-parseInt(j)*this.fontMapData[i].cellSpace - -this.fontMapData[i].map.length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.y,
							z : this.fontMapData[i].center.z
						};
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].rotate = {x:0, y:0, z:0};
						break;
					case 3:
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].shade = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].fill = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].stroke = false;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].size = this.fontMapData[i].cellLength/2;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].position = {
							x : (parseInt(k)*this.fontMapData[i].cellSpace - this.fontMapData[i].map[j].length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.x,
							y : (-parseInt(j)*this.fontMapData[i].cellSpace - -this.fontMapData[i].map.length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.y,
							z : this.fontMapData[i].center.z
						};
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].rotate = {x:0, y:0, z:90};
						break;
					case 4:
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].shade = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].fill = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].stroke = false;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].size = this.fontMapData[i].cellLength/2;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].position = {
							x : (parseInt(k)*this.fontMapData[i].cellSpace - this.fontMapData[i].map[j].length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.x,
							y : (-parseInt(j)*this.fontMapData[i].cellSpace - -this.fontMapData[i].map.length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.y,
							z : this.fontMapData[i].center.z
						};
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].rotate = {x:0, y:0, z:270};
						break;
					case 5:
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].shade = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].fill = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].stroke = false;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].size = this.fontMapData[i].cellLength/2;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].position = {
							x : (parseInt(k)*this.fontMapData[i].cellSpace - this.fontMapData[i].map[j].length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.x,
							y : (-parseInt(j)*this.fontMapData[i].cellSpace - -this.fontMapData[i].map.length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.y,
							z : this.fontMapData[i].center.z
						};
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].rotate = {x:0, y:0, z:180};
						
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].shade = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].fill = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].stroke = false;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].size = this.fontMapData[i].cellLength/2;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].position = {
							x : (parseInt(k)*this.fontMapData[i].cellSpace - this.fontMapData[i].map[j].length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.x,
							y : (-parseInt(j)*this.fontMapData[i].cellSpace - -this.fontMapData[i].map.length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.y,
							z : this.fontMapData[i].center.z
						};
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].rotate = {x:0, y:0, z:0};
						break;
				};
			};
		};
		lastMap += this.fontMapData[i].mapDataNum;
	};
	return this.returnData;
};














var fontmap_secondTitle = function() {
	this.returnData = new Array();
	this.col = 80;
	this.row = 160;
	this.cellLength = 22;
	this.cellSpace = 22;
	for(var i=0; i<DEFIINE_instanceNum; i++) {
		this.returnData[i] = {
			shade : false,
			fill : false,
			stroke : false,
			fillColor: {r:1.0, g:1.0, b:1.0, a:1.0},
			strokeColor: {r:1.0, g:1.0, b:1.0, a:1.0},
			size: 0,
			position: {x:0, y:0, z:0},
			rotate: {x:0, y:0, z:0}
		};
	};
	// this.fontMapData = [
	// 	{//H
	// 		cellLength : this.cellLength,
	// 		cellSpace : this.cellSpace,
	// 		center : {x:this.col*-3.5, y:this.row*0, z:0}, 
	// 		map : [[0,4,0,2,0],[0,5,0,1,0],[0,2,1,5,0],[0,5,0,5,0],[0,1,0,3,0]] ,  
	// 		mapDataNum : 5*5*2,
	// 		colUnit : 5*2
	// 	},
	// 	{//A
	// 		cellLength : this.cellLength,
	// 		cellSpace : this.cellSpace,
	// 		center : {x:this.col*-2.5, y:this.row*0, z:0}, 
	// 		map : [[0,0,0,2,0],[0,0,2,5,0],[0,2,1,1,0],[0,1,3,5,0],[0,1,0,1,0]],  
	// 		mapDataNum : 5*5*2,
	// 		colUnit : 5*2
	// 	},
	// 	{//C
	// 		cellLength : this.cellLength,
	// 		cellSpace : this.cellSpace,
	// 		center : {x:this.col*-1.5, y:this.row*0, z:0}, 
	// 		map : [[0,0,4,0,0],[0,2,1,4,0],[0,1,0,0,0],[0,3,4,1,0],[0,0,3,0,0]],  
	// 		mapDataNum : 5*5*2,
	// 		colUnit : 5*2
	// 	},
	// 	{//K
	// 		cellLength : this.cellLength,
	// 		cellSpace : this.cellSpace,
	// 		center : {x:this.col*-0.5, y:this.row*0, z:0}, 
	// 		map : [[0,4,0,0,0],[0,4,0,2,0],[0,5,2,1,0],[0,5,0,4,0],[0,1,0,3,0]] ,  
	// 		mapDataNum : 5*5*2,
	// 		colUnit : 5*2
	// 	},
	// 	{//Y
	// 		cellLength : this.cellLength,
	// 		cellSpace : this.cellSpace,
	// 		center : {x:this.col*1.0, y:this.row*0, z:0}, 
	// 		map : [[0,0,0,2,0],[0,4,0,1,0],[0,3,2,0,0],[0,0,5,0,0],[0,0,3,0,0]],  
	// 		mapDataNum : 5*5*2,
	// 		colUnit : 5*2
	// 	},
	// 	{//O
	// 		cellLength : this.cellLength,
	// 		cellSpace : this.cellSpace,
	// 		center : {x:this.col*2.0, y:this.row*0, z:0}, 
	// 		map : [[0,0,4,0,0],[0,2,1,4,0],[0,1,0,3,0],[0,3,4,1,0],[0,0,3,0,0]],  
	// 		mapDataNum : 5*5*2,
	// 		colUnit : 5*2
	// 	},
	// 	{//U
	// 		cellLength : this.cellLength,
	// 		cellSpace : this.cellSpace,
	// 		center : {x:this.col*3.0, y:this.row*0, z:0}, 
	// 		map : [[0,0,0,4,0],[0,2,0,3,0],[0,5,0,5,0],[0,5,0,1,0],[0,3,1,0,0]],  
	// 		mapDataNum : 5*5*2,
	// 		colUnit : 5*2
	// 	}
	// ];
	this.fontMapData = SECOND_TITLE_FONT_MAP_ARRAY;
	for (i in this.fontMapData) {
		this.fontMapData[i].cellLength = this.cellLength;
		this.fontMapData[i].cellSpace = this.cellSpace;
		this.fontMapData[i].center.x *= this.col
		this.fontMapData[i].center.y *= this.row
		this.fontMapData[i].mapDataNum = 5 * 5 * 2
		this.fontMapData[i].colUnit = 5 * 2
	}
	var lastMap = 0;
	for(var i=0; i<this.fontMapData.length; i++) {
		for(var j=0; j<this.fontMapData[i].map.length; j++) {
			for(var k=0; k<this.fontMapData[i].map[j].length; k++) {
				switch(this.fontMapData[i].map[j][k]) {
					case 0:
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].shade = false;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].fill = false;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].stroke = false;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].size = 0;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].position = {
							x : 0,
							y : 0,
							z : 0
						};
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].rotate = {x:0, y:0, z:0};
						break;
					case 1:
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].shade = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].fill = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].stroke = false;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].size = this.fontMapData[i].cellLength/2;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].position = {
							x : (parseInt(k)*this.fontMapData[i].cellSpace - this.fontMapData[i].map[j].length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.x,
							y : (-parseInt(j)*this.fontMapData[i].cellSpace - -this.fontMapData[i].map.length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.y,
							z : this.fontMapData[i].center.z
						};
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].rotate = {x:0, y:0, z:180};
						break;
					case 2:
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].shade = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].fill = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].stroke = false;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].size = this.fontMapData[i].cellLength/2;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].position = {
							x : (parseInt(k)*this.fontMapData[i].cellSpace - this.fontMapData[i].map[j].length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.x,
							y : (-parseInt(j)*this.fontMapData[i].cellSpace - -this.fontMapData[i].map.length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.y,
							z : this.fontMapData[i].center.z
						};
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].rotate = {x:0, y:0, z:0};
						break;
					case 3:
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].shade = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].fill = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].stroke = false;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].size = this.fontMapData[i].cellLength/2;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].position = {
							x : (parseInt(k)*this.fontMapData[i].cellSpace - this.fontMapData[i].map[j].length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.x,
							y : (-parseInt(j)*this.fontMapData[i].cellSpace - -this.fontMapData[i].map.length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.y,
							z : this.fontMapData[i].center.z
						};
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].rotate = {x:0, y:0, z:90};
						break;
					case 4:
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].shade = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].fill = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].stroke = false;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].size = this.fontMapData[i].cellLength/2;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].position = {
							x : (parseInt(k)*this.fontMapData[i].cellSpace - this.fontMapData[i].map[j].length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.x,
							y : (-parseInt(j)*this.fontMapData[i].cellSpace - -this.fontMapData[i].map.length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.y,
							z : this.fontMapData[i].center.z
						};
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].rotate = {x:0, y:0, z:270};
						break;
					case 5:
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].shade = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].fill = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].stroke = false;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].size = this.fontMapData[i].cellLength/2;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].position = {
							x : (parseInt(k)*this.fontMapData[i].cellSpace - this.fontMapData[i].map[j].length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.x,
							y : (-parseInt(j)*this.fontMapData[i].cellSpace - -this.fontMapData[i].map.length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.y,
							z : this.fontMapData[i].center.z
						};
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].rotate = {x:0, y:0, z:180};
						
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].shade = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].fill = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].stroke = false;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].size = this.fontMapData[i].cellLength/2;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].position = {
							x : (parseInt(k)*this.fontMapData[i].cellSpace - this.fontMapData[i].map[j].length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.x,
							y : (-parseInt(j)*this.fontMapData[i].cellSpace - -this.fontMapData[i].map.length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.y,
							z : this.fontMapData[i].center.z
						};
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].rotate = {x:0, y:0, z:0};
						break;
				};
			};
		};
		lastMap += this.fontMapData[i].mapDataNum;
	};
	return this.returnData;
};







































<!-- init -->
window.onresize = function() {
console.log(window.innerWidth)
	init.size.x = window.innerWidth;
	init.size.y = window.innerHeight;
	init.canvas.width = init.size.x;
	init.canvas.height = init.size.y;
	camera.display.x = init.size.x/2;
	camera.display.y = init.size.y/2;
};


var init = {
	canvas : new Object(),
	ctx : new Object(),
	size : new Object(),
	nodeStrokeFlag : false,
	canvasSetup : function() {
		init.canvas = document.getElementById("canvas");
	  init.size.x = window.innerWidth;
	  init.size.y = window.innerHeight;
		init.canvas.width = init.size.x;
		init.canvas.height = init.size.y;
		init.ctx = init.canvas.getContext("2d");
	}
};

init.canvasSetup();

<!-- init -->










<!-- utilities -->

var dtr = function(d) {return d*Math.PI/180};
var ceiling = function(num) {return parseInt(num*10000)/10000};


//polarToRectangle
var polarToRectangle =  function(dX, dY, radius) {
	var x = Math.sinE0(dtr(dX)) * Math.cosE0(dtr(dY)) * radius;
	var y = Math.sinE0(dtr(dX)) * Math.sinE0(dtr(dY)) * radius;
	var z = Math.cosE0(dtr(dX)) * radius;
	return {x:y, y:z, z:x};
};

//rectangleToPolar
var rectangleToPolar = function(x, y, z) {
	if(x == 0)	var xD = 0.001;
	else		var xD = x;
	if(y == 0)	var yD = 0.001;
	else		var yD = y;
	if(z == 0)	var zD = 0.001;
	else		var zD = z;
	var radius = Math.sqrt(xD*xD + yD*yD + zD*zD);
	var theta = Math.atan(zD / Math.sqrt(xD*xD + yD*yD));
	var phi = Math.atan(yD / xD);
	return {x:theta*(180/Math.PI), y:phi*(180/Math.PI), r:radius};
};


Math.sinE0 = function(val) {
	if(val === 0) {
		return Math.sin(0.000001)
	} else {
		return Math.sin(val);
	};
};
Math.cosE0 = function(val) {
	if(val === 0) {
		return Math.cos(0.000001)
	} else {
		return Math.cos(val);
	};
};
Math.getVector = function(startVertex, endVertex) {
	return {
		x : endVertex.affineOut.x - startVertex.affineOut.x,
		y : endVertex.affineOut.y - startVertex.affineOut.y,
		z : endVertex.affineOut.z - startVertex.affineOut.z
	};
};
Math.getCross = function(vector1, vector2) {
	return {
		x : vector1.y*vector2.z - vector1.z*vector2.y,
		y : vector1.z*vector2.x - vector1.x*vector2.z,
		z : vector1.x*vector2.y - vector1.y*vector2.x
	};
};
Math.getNormal = function(cross3d) {
	var length = Math.sqrt(cross3d.x*cross3d.x + cross3d.y*cross3d.y + cross3d.z*cross3d.z);
	return {
		x : cross3d.x / length,
		y : cross3d.y / length,
		z : cross3d.z / length
	};
};
var getNormal = function(vectorSet0, vectorSet1) {
	var vector1 = Math.getVector(vectorSet0[0],vectorSet0[1]);
	var vector2 = Math.getVector(vectorSet1[0],vectorSet1[1]);
	var cross = Math.getCross(vector1, vector2);
	var normal = Math.getNormal(cross);
	return normal;
};

Math.getDot = function(vector1, vector2) {
	return vector1.x*vector2.x + vector1.y*vector2.y + vector1.z*vector2.z;
};


var closeValue = function(minTime, maxTime) {
	this.flag = 0;
	
	this.progress = 0;
	this.startTime = 0;
	this.durationTime = 0;
	
	this.fromValue = 0;
	this.toValue = 0;
	this.smoothFlag = true;
	
	this.minValue = 0;
	this.maxValue = 1;
	this.minDuration = minTime;
	this.maxDuration = maxTime;
};
closeValue.prototype = {
	init : function() {
		this.durationTime = this.minDuration + (this.maxDuration-this.minDuration) * Math.random();
		this.startTime = Date.now();
		this.progress = Math.min(1, ((Date.now()-this.startTime)/this.durationTime));
		if(this.smoothFlag == true) {
			this.fromValue = this.toValue;
		} else {
			this.fromValue = Math.random();
		};
		this.toValue = this.minValue + this.maxValue * Math.random();
		this.flag = 1;
		return this.fromValue + (this.toValue - this.fromValue) * this.progress;
	},
	update : function() {
		this.progress = Math.min(1, ((Date.now()-this.startTime)/this.durationTime));
		if(this.progress== 1) this.flag = 0;
		return this.fromValue + (this.toValue - this.fromValue) * this.progress;
	},
	execution : function() {
		if(this.flag == 0)		{return this.init()}
		else if(this.flag == 1)	{return this.update()};
	}
};

<!-- utilities -->
















<!-- 3D pipeline -->

var camera = {
	focus : 750,
	self : {
		x : 0,
		y : 0,
		z : 100
	},
	rotate : {
		x : 0,
		y : 0,
		z : 0
	},
	zoom : 1,
	display : {
		x : init.size.x/2,
		y : init.size.y/2,
		z : 0
	},
	clipPlane : {
		near : 0,
		far : 1000
	},
	enableCulling : false
};


var affine = {
	world : {
		size : function(p, size) {
			return {
				x :	p.x * size.x,
				y : p.y * size.y,
				z : p.z * size.z
			}
		},
		rotate: {
			x : function(p, rotate) {
				return {
					x : p.x,
					y : p.y*Math.cosE0(dtr(rotate.x)) - p.z*Math.sinE0(dtr(rotate.x)),
					z : p.y*Math.sinE0(dtr(rotate.x)) + p.z*Math.cosE0(dtr(rotate.x))
				}
			},
			y : function(p, rotate) {
				return {
					x : p.x*Math.cosE0(dtr(rotate.y)) + p.z*Math.sinE0(dtr(rotate.y)),
					y : p.y,
					z : -p.x*Math.sinE0(dtr(rotate.y)) + p.z*Math.cosE0(dtr(rotate.y))
				}
			},
			z : function(p, rotate) {
				return {
					x : p.x*Math.cosE0(dtr(rotate.z)) - p.y*Math.sinE0(dtr(rotate.z)),
					y : p.x*Math.sinE0(dtr(rotate.z)) + p.y*Math.cosE0(dtr(rotate.z)),
					z : p.z
				}
			}
		},
		position : function(p, position) {
			return {
				x : p.x + position.x,
				y : p.y + position.y,
				z : p.z + position.z
			}
		},
	},
	view : {
		point : function(p) {
			return {
				x : p.x - camera.self.x,
				y : p.y - camera.self.y,
				z : p.z - camera.self.z
			}
		},
		x : function(p) {
			return {
				x : p.x,
				y : p.y*Math.cosE0(dtr(camera.rotate.x)) - p.z*Math.sinE0(dtr(camera.rotate.x)),
				z : p.y*Math.sinE0(dtr(camera.rotate.x)) + p.z*Math.cosE0(dtr(camera.rotate.x))
			}
		},
		y : function(p) {
			return {
				x : p.x*Math.cosE0(dtr(camera.rotate.y)) + p.z*Math.sinE0(dtr(camera.rotate.y)), 
				y : p.y,
				z : p.x*-Math.sinE0(dtr(camera.rotate.y)) + p.z*Math.cosE0(dtr(camera.rotate.y))
			}
		},
		viewReset : function(p) {
			return {
				x : p.x - camera.self.x,
				y : p.y - camera.self.y,
				z : p.z - camera.self.z
			}
		},
		righthandedReversal : function(p) {
			return {
				x : p.x,
				y : -p.y,
				z : p.z,
			}
		}
	},
	perspective : function(p) {
		return {
			x : p.x * ((camera.focus-camera.self.z) / ((camera.focus-camera.self.z) - p.z)) * camera.zoom,
			y : p.y * ((camera.focus-camera.self.z) / ((camera.focus-camera.self.z) - p.z)) * camera.zoom,
			z : p.z * ((camera.focus-camera.self.z) / ((camera.focus-camera.self.z) - p.z)) * camera.zoom,
			p : ((camera.focus-camera.self.z) / ((camera.focus-camera.self.z) - p.z)) * camera.zoom,
		}
	},
	display : function(p, display) {
		return {
			x : p.x + display.x,
			y : p.y + display.y,
			z : p.z + display.z,
			p : p.p,
		}
	},
	process : function(model, size, rotate, position,display) {
		var ret = affine.world.size(model, size);
		ret = affine.world.rotate.x(ret, rotate);
		ret = affine.world.rotate.y(ret, rotate);
		ret = affine.world.rotate.z(ret, rotate);
		ret = affine.world.position(ret, position);
		ret = affine.view.point(ret);
		ret = affine.view.x(ret);
		ret = affine.view.y(ret);
		ret = affine.view.viewReset(ret);
		ret = affine.view.righthandedReversal(ret);
		ret = affine.perspective(ret);
		ret = affine.display(ret, display);
		return ret;
	}
};


var vertex3d = function(param) {
	this.affineIn = new Object;
	this.affineOut = new Object;
	this.affineIn.vertex = ({x:0,y:0,z:0} || param.vertex);
	this.affineIn.size = ({x:1,y:1,z:1} || param.size);
	this.affineIn.rotate = ({x:0,y:0,z:0,} || param.rotate);
	this.affineIn.position = ({x:0,y:0,z:0} || param.position);
};
vertex3d.prototype = {
	vertexUpdate : function() {
		this.affineOut = affine.process(
			this.affineIn.vertex,
			this.affineIn.size,
			this.affineIn.rotate,
			this.affineIn.position,
			camera.display
		);
	}
};


var getFace = function(verts) {
	return {
		verts : [verts[0], verts[1], verts[2]],
		normal : getNormal([verts[1],verts[0]], [verts[2],verts[0]]),
		zIndex : verts[0].affineOut.p + verts[1].affineOut.p + verts[2].affineOut.p
	};
};


var shader = {
	shadeObject : new Array(),
	chromaticAberration : {
		flag : false,
		r : {x:3, y:0},
		g : {x:0, y:0},
		b : {x:-3, y:0}
	},
	zSort : function() {
		shader.shadeObject.sort(
			function(a, b) {
				if (a.face.zIndex < b.face.zIndex) return -1;
				if (a.face.zIndex > b.face.zIndex) return 1;
				return 0;
			}
		);
	},
	flatShader : {
		directionalLighting : function() {
			if(light.enableLight == true) {
				for(var i=0; i<shader.shadeObject.length; i++) {
					var lambertReflectance = Math.getDot(
						{
							x : ceiling(shader.shadeObject[i].face.normal.x),
							y : ceiling(shader.shadeObject[i].face.normal.y),
							z : ceiling(shader.shadeObject[i].face.normal.z)
						},
						{
							x : light.directionalLight.degree.x,
							y : light.directionalLight.degree.y,
							z : light.directionalLight.degree.z
						}
					);
					
					shader.shadeObject[i].fillColor = {
						r : (light.directionalLight.color.r*lambertReflectance) * ((shader.shadeObject[i].fillColor.r + light.ambientLight.color.r)/2) + light.ambientLight.intensity,
						g : (light.directionalLight.color.g*lambertReflectance) * ((shader.shadeObject[i].fillColor.g + light.ambientLight.color.g)/2) + light.ambientLight.intensity,
						b : (light.directionalLight.color.b*lambertReflectance) * ((shader.shadeObject[i].fillColor.b + light.ambientLight.color.b)/2) + light.ambientLight.intensity,
						a : shader.shadeObject[i].fillColor.a
					};
					shader.shadeObject[i].strokeColor = {
						r : (light.directionalLight.color.r*lambertReflectance) * ((shader.shadeObject[i].strokeColor.r + light.ambientLight.color.r)/2) + light.ambientLight.intensity,
						g : (light.directionalLight.color.g*lambertReflectance) * ((shader.shadeObject[i].strokeColor.g + light.ambientLight.color.g)/2) + light.ambientLight.intensity,
						b : (light.directionalLight.color.b*lambertReflectance) * ((shader.shadeObject[i].strokeColor.b + light.ambientLight.color.b)/2) + light.ambientLight.intensity,
						a : shader.shadeObject[i].strokeColor.a
					};
				};
			};
		}
	},
	fillShade : function(augumentColor) {
		init.ctx.fillStyle = "rgba("+
			parseInt(augumentColor.r*255) +","+
			parseInt(augumentColor.g*255) +","+
			parseInt(augumentColor.b*255) +","+
			augumentColor.a +")";
		init.ctx.fill();
	},
	strokeShade : function(augumentColor) {
		init.ctx.lineWidth = 0.3;
		init.ctx.strokeStyle = "rgba("+
			parseInt(augumentColor.r*255) +","+
			parseInt(augumentColor.g*255) +","+
			parseInt(augumentColor.b*255) +","+
			augumentColor.a +")";
		init.ctx.stroke();
	},
	shade : function(color) {
		for(var i=0; i<shader.shadeObject.length; i++) {
			if(shader.shadeObject[i].face.normal.z>0 && shader.shadeObject[i].face.zIndex<7&&shader.shadeObject[i].face.zIndex>0) {
				init.ctx.beginPath();
				for(var j=0; j<shader.shadeObject[i].face.verts.length; j++) {
					if(j == 0) {
						init.ctx.moveTo(shader.shadeObject[i].face.verts[j].affineOut.x, shader.shadeObject[i].face.verts[j].affineOut.y);
					} else {
						init.ctx.lineTo(shader.shadeObject[i].face.verts[j].affineOut.x, shader.shadeObject[i].face.verts[j].affineOut.y);
					};
				};
				init.ctx.closePath();
				switch(color) {
					case "r":
						if(shader.shadeObject[i].fill === true) shader.fillShade({r:shader.shadeObject[i].fillColor.r,g:0,b:0,a:shader.shadeObject[i].fillColor.a});
						if(shader.shadeObject[i].stroke === true) shader.strokeShade({r:shader.shadeObject[i].strokeColor.r,g:0,b:0,a:shader.shadeObject[i].strokeColor.a});
						break;
					case "g":
						if(shader.shadeObject[i].fill === true) shader.fillShade({r:0,g:shader.shadeObject[i].fillColor.g,b:0,a:shader.shadeObject[i].fillColor.a});
						if(shader.shadeObject[i].stroke === true) shader.strokeShade({r:0,g:shader.shadeObject[i].strokeColor.g,b:0,a:shader.shadeObject[i].strokeColor.a});
						break;
					case "b":
						if(shader.shadeObject[i].fill === true) shader.fillShade({r:0,g:0,b:shader.shadeObject[i].fillColor.b,a:shader.shadeObject[i].fillColor.a});
						if(shader.shadeObject[i].stroke === true) shader.strokeShade({r:0,g:0,b:shader.shadeObject[i].strokeColor.b,a:shader.shadeObject[i].strokeColor.a});
						break;
					default:
						if(shader.shadeObject[i].fill === true) shader.fillShade(shader.shadeObject[i].fillColor);
						if(shader.shadeObject[i].stroke === true) shader.strokeShade(shader.shadeObject[i].strokeColor);
						break;
				};
			};
		};
	},
	execution : function() {
		init.ctx.save();
		if(shader.chromaticAberration.flag === false) {
			init.ctx.globalCompositeOperation = "source-over";
			shader.shade();
		} else {
			init.ctx.globalCompositeOperation = "lighter";
			init.ctx.translate(shader.chromaticAberration.r.x, shader.chromaticAberration.r.y);
			shader.shade("r");
			init.ctx.translate(-shader.chromaticAberration.r.x, -shader.chromaticAberration.r.y);
			init.ctx.translate(shader.chromaticAberration.g.x, shader.chromaticAberration.g.y);
			shader.shade("g");
			init.ctx.translate(-shader.chromaticAberration.g.x, -shader.chromaticAberration.g.y);
			init.ctx.translate(shader.chromaticAberration.b.x, shader.chromaticAberration.b.y);
			shader.shade("b");
			init.ctx.translate(-shader.chromaticAberration.b.x, -shader.chromaticAberration.b.y);
		};
		init.ctx.restore();
	}
};

<!-- 3D pipeline -->












<!-- model -->

var isoscelesRightTriangle = function(argument) {
	// base object
	this.vertices = new Object();
	this.shadeObjects = new Object();
	
	// model parameter
	this.shade = argument.shade;
	this.fill = argument.fill;
	this.stroke = argument.stroke;
	this.fillColor = argument.fillColor;
	this.strokeColor = argument.strokeColor;
	this.size = argument.size;
	this.position = argument.position;
	this.rotate = argument.rotate;
	
	this.uniqueFlag001 = false; 
	
	//model data
	this.vertexData = {
		v0 : {x:1, y:1, z:1},
		v1 : {x:1, y:-1, z:1},
		v2 : {x:-1, y:-1, z:1},
		v3 : {x:1, y:-1, z:-1}
	};
	this.indexData = {
		f0 : ["v0", "v1", "v2"],
		f1 : ["v0", "v3", "v1"],
		f2 : ["v0", "v2", "v3"],
		f3 : ["v1", "v3", "v2"]
	};
	// vertices init
	for(i in this.vertexData) {
		this.vertices[i] = new vertex3d({
			position : this.position,
			vertex : {x:this.vertexData[i].x*this.size, y:this.vertexData[i].y*this.size, z:this.vertexData[i].z*this.size}
		});
		this.vertices[i].vertexUpdate();
	};
	// shadeObjects init
	for(var i in this.indexData) {
		this.shadeObjects[i] = new Object;
		this.shadeObjects[i].face = new Object;
		this.shadeObjects[i].fill = this.fill;
		this.shadeObjects[i].stroke = this.stroke;
		this.shadeObjects[i].fillColor = this.fillColor;
		this.shadeObjects[i].strokeColor = this.strokeColor;
	};
};
isoscelesRightTriangle.prototype = {
	controll : function(argument) {
		this.shade = argument.shade;
		if(this.shade === true) {
			this.fill = argument.fill;
			this.stroke = argument.stroke;

			if(argument.size) {
				this.size = argument.size;
			};
			if(argument.fillColor) {
				this.fillColor = {
					r : argument.fillColor.r,
					g : argument.fillColor.g,
					b : argument.fillColor.b,
					a : argument.fillColor.a
				};
			};
			if(argument.strokeColor) {
				this.strokeColor = {
					r : argument.strokeColor.r,
					g : argument.strokeColor.g,
					b : argument.strokeColor.b,
					a : argument.strokeColor.a
				};
			};
			if(argument.position) {
				this.position = {
					x : argument.position.x,
					y : argument.position.y,
					z : argument.position.z
				};
			};
			if(argument.rotate) { 
				this.rotate = {
					x : argument.rotate.x,
					y : argument.rotate.y,
					z : argument.rotate.z
				};
			};
		};
	},
	update : function() {
		if(this.shade === true) {
			for(var i in this.vertexData) {
				if(this.uniqueFlag001 == false) {
					this.vertices[i].affineIn.vertex = {
						x : this.vertexData[i].x*this.size,
						y : this.vertexData[i].y*this.size,
						z : this.vertexData[i].z*this.size,
					};
				} else {
					this.vertices[i].affineIn.vertex = {
						x : this.vertexData[i].x*this.size * (0.8*Math.random()+0.5),
						y : this.vertexData[i].y*this.size * (0.8*Math.random()+0.5),
						z : this.vertexData[i].z*this.size * (0.8*Math.random()+0.5),
					};
				};
				this.vertices[i].affineIn.position = {
					x : this.position.x,
					y : this.position.y,
					z : this.position.z
				};
				this.vertices[i].affineIn.rotate = {
					x : this.rotate.x,
					y : this.rotate.y,
					z : this.rotate.z
				};
				this.vertices[i].vertexUpdate();
			};
			for(var i in this.indexData) {
				this.shadeObjects[i].face = getFace([this.vertices[this.indexData[i][0]], this.vertices[this.indexData[i][1]], this.vertices[this.indexData[i][2]]]);
				this.shadeObjects[i].fill = this.fill;
				this.shadeObjects[i].stroke = this.stroke;
				this.shadeObjects[i].fillColor = this.fillColor;
				this.shadeObjects[i].strokeColor = this.strokeColor;
			};
		};
	},
	addShader : function() {
		if(this.shade === true) {
			for(var i in this.shadeObjects) {
				shader.shadeObject.push(this.shadeObjects[i]);
			};
		};
	}
};

<!-- model -->













<!-- object -->

var DEFIINE_instanceNum = 2100;
var instanceObject = new Array();
var objectInit = function() {
	for(var i=0; i<DEFIINE_instanceNum; i++) {
		instanceObject[i] = new isoscelesRightTriangle({
			shade : false,
			fill : false,
			stroke : false,
			color: {r:0.0, g:0.0, b:0.0, a:0.0},
			fillColor: {r:0.0, g:0.0, b:0.0, a:0.0},
			strokeColor: {r:0.0, g:0.0, b:0.0, a:0.0},
			size: 0,
			position: {x:2000*Math.random()-1000, y:2000*Math.random()-1000, z:2000*Math.random()-1000},
			rotate: {x:720*Math.random()-360, y:720*Math.random()-360, z:720*Math.random()-360}
		});
	};
};
var objectUpdate = function() {
	for(var i=0; i<instanceObject.length; i++){
		if(instanceObject[i]) {
			instanceObject[i].controll({
				shade : controll.value[i].shade,
				fill : controll.value[i].fill,
				stroke : controll.value[i].stroke,
				color: controll.value[i].color,
				fillColor : controll.value[i].fillColor,
				strokeColor : controll.value[i].strokeColor,
				size: controll.value[i].size,
				position: controll.value[i].position,
				rotate: controll.value[i].rotate
			});
			instanceObject[i].update();
			instanceObject[i].addShader();
		};
	};
};

<!-- object -->

<!-- motion -->

var freemap_disconnected = function() {
	this.returnData = new Array();
	for(var i=0; i<DEFIINE_instanceNum; i++) {
		this.returnData[i] = {
			shade : false,
			fill : false,
			stroke : false,
			fillColor: {r:1.0, g:1.0, b:1.0, a:1.0},
			strokeColor: {r:1.0, g:1.0, b:1.0, a:1.0},
			size: 0,
			position: {x:Math.random()*1000-500, y:Math.random()*1000-500, z:Math.random()*1000-500},
			rotate: {x:Math.random()*1000-500, y:Math.random()*1000-500, z:Math.random()*1000-500}
		};
	};
	
	return this.returnData;
};


var freemap_random = function() {
	this.returnData = new Array();
	for(var i=0; i<DEFIINE_instanceNum; i++) {
		this.returnData[i] = {
			shade : false,
			fill : false,
			stroke : false,
			fillColor: {r:1.0, g:1.0, b:1.0, a:1.0},
			strokeColor: {r:1.0, g:1.0, b:1.0, a:1.0},
			size: Math.random()*2,
			position: {x:Math.random()*1500-750, y:Math.random()*1500-750, z:Math.random()*1500-750},
			rotate: {x:Math.random()*720-360, y:Math.random()*720-360, z:Math.random()*720-360}
		};
	};
	for(var i=0; i<100; i++) {
		this.returnData[i].shade = true;
		this.returnData[i].fill = true;
	};

	return this.returnData;
};



var fontmap_fullchara = function() {
	this.returnData = new Array();
	this.col = 130;
	this.row = 150;
	this.cellLength = 18;
	this.cellSpace = 18;
	for(var i=0; i<DEFIINE_instanceNum; i++) {
		this.returnData[i] = {
			shade : false,
			fill : false,
			stroke : false,
			fillColor: {r:1.0, g:1.0, b:1.0, a:1.0},
			strokeColor: {r:1.0, g:1.0, b:1.0, a:1.0},
			size: 0,
			position: {x:0, y:0, z:0},
			rotate: {x:0, y:0, z:0}
		};
	};
	this.fontMapData = [
		{//A
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*-2, y:this.row*3, z:0}, 
			map : [[0,0,0,2,0],[0,0,2,5,0],[0,2,1,1,0],[0,1,3,5,0],[0,1,0,1,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		{//B
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*-1, y:this.row*3, z:0}, 
			map : [[0,4,0,0,0],[0,3,3,4,0],[0,5,3,1,0],[0,5,2,1,0],[0,3,1,0,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		{//C
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*0, y:this.row*3, z:0}, 
			map : [[0,0,4,0,0],[0,2,1,4,0],[0,1,0,0,0],[0,3,4,1,0],[0,0,3,0,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		{//D
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*1, y:this.row*3, z:0}, 
			map : [[0,4,0,0,0],[0,3,3,4,0],[0,5,0,5,0],[0,5,2,1,0],[0,1,1,0,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		{//E
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*2, y:this.row*3, z:0}, 
			map : [[0,0,2,1,0],[0,2,1,0,0],[0,2,2,1,0],[0,5,0,2,0],[0,1,3,1,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		
		{//F
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*-2, y:this.row*2, z:0}, 
			map : [[0,0,2,1,0],[0,2,1,0,0],[0,2,2,1,0],[0,5,0,0,0],[0,1,0,0,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		{//G
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*-1, y:this.row*2, z:0}, 
			map : [[0,0,2,0,0],[0,2,1,0,0],[0,1,0,4,0],[0,3,2,1,0],[0,0,3,0,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		{//H
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*0, y:this.row*2, z:0}, 
			map : [[0,4,0,2,0],[0,5,0,1,0],[0,2,1,5,0],[0,5,0,5,0],[0,1,0,3,0]] ,  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		{//I
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*1, y:this.row*2, z:0}, 
			map : [[0,0,2,0,0],[0,0,2,0,0],[0,0,5,0,0],[0,0,5,0,0],[0,0,1,0,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		{//J
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*2, y:this.row*2, z:0}, 
			map : [[0,0,0,2,0],[0,0,0,5,0],[0,0,0,5,0],[0,4,2,1,0],[0,0,1,0,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		
		{//K
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*-2, y:this.row*1, z:0}, 
			map : [[0,4,0,0,0],[0,4,0,2,0],[0,5,2,1,0],[0,5,0,4,0],[0,1,0,3,0]] ,  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		{//L
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*-1, y:this.row*1, z:0}, 
			map : [[0,4,0,0,0],[0,5,0,0,0],[0,5,0,0,0],[0,3,0,0,0],[0,0,3,4,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		{//M
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*0, y:this.row*1, z:0}, 
			map : [[0,4,0,0,0],[0,5,4,4,0],[0,5,3,3,4],[0,3,0,0,3],[0,3,0,0,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		{//N
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*1, y:this.row*1, z:0}, 
			map : [[0,0,0,4,0],[0,4,0,5,0],[0,5,4,4,0],[0,5,3,5,0],[0,1,0,3,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		{//O
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*2, y:this.row*1, z:0}, 
			map : [[0,0,4,0,0],[0,2,1,4,0],[0,1,0,3,0],[0,3,4,1,0],[0,0,3,0,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		
		{//P
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*-2, y:this.row*0, z:0}, 
			map : [[0,4,0,0,0],[0,5,3,4,0],[0,3,4,1,0],[0,5,0,0,0],[0,1,0,0,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		{//Q
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*-1, y:this.row*0, z:0}, 
			map : [[0,0,4,0,0],[0,2,1,4,0],[0,1,2,3,0],[0,3,2,5,0],[0,0,3,0,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		{//R
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*0, y:this.row*0, z:0}, 
			map : [[0,4,0,0,0],[0,5,3,4,0],[0,3,4,1,0],[0,5,0,4,0],[0,1,0,3,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		{//S
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*1, y:this.row*0, z:0}, 
			map : [[0,0,0,4,0],[0,2,1,0,0],[0,0,3,4,0],[0,3,2,1,0],[0,0,1,0,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		{//T
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*2, y:this.row*0, z:0}, 
			map : [[0,2,5,1,0],[0,0,5,0,0],[0,0,5,0,0],[0,0,2,0,0],[0,0,1,0,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		
		{//U
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*-2, y:this.row*-1, z:0}, 
			map : [[0,0,0,4,0],[0,2,0,3,0],[0,5,0,5,0],[0,5,0,1,0],[0,3,1,0,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		{//V
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*-1, y:this.row*-1, z:0}, 
			map : [[0,0,0,2,0],[0,0,0,5,0],[0,4,0,2,0],[0,3,4,1,0],[0,0,3,0,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		{//W
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*0, y:this.row*-1, z:0}, 
			map : [[0,2,0,0,0],[0,2,0,0,2],[0,5,2,2,1],[0,5,1,1,0],[0,1,0,0,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		{//X
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*1, y:this.row*-1, z:0}, 
			map : [[0,0,0,2,0],[0,4,0,1,0],[0,3,2,0,0],[0,2,1,4,0],[0,1,0,3,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		{//Y
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*2, y:this.row*-1, z:0}, 
			map : [[0,0,0,2,0],[0,4,0,1,0],[0,3,2,0,0],[0,0,5,0,0],[0,0,3,0,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		
		{//Z
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*-2, y:this.row*-2, z:0}, 
			map : [[0,0,0,0,0],[0,2,5,1,0],[0,0,2,1,0],[0,2,1,0,0],[2,5,1,1,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		{//.
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*-1, y:this.row*-2, z:0}, 
			map : [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,5,0,0,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		{//,
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*-0, y:this.row*-2, z:0}, 
			map : [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,1,0,0,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		{//!
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*1, y:this.row*-2, z:0}, 
			map : [[0,0,2,0,0],[0,0,5,0,0],[0,0,5,0,0],[0,0,1,0,0],[0,0,1,0,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		{//?
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*2, y:this.row*-2, z:0}, 
			map : [[0,0,2,4,0],[0,0,0,2,0],[0,0,2,1,0],[0,0,1,0,0],[0,0,1,0,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		
		{//1
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*-2, y:this.row*-3, z:0}, 
			map : [[0,0,2,0,0],[0,0,5,0,0],[0,0,5,0,0],[0,0,5,0,0],[0,0,3,0,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		{//2
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*-1, y:this.row*-3, z:0}, 
			map : [[0,0,0,0,0],[0,0,3,4,0],[0,0,2,1,0],[0,2,1,0,0],[0,3,2,4,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		{//3
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*0, y:this.row*-3, z:0}, 
			map : [[0,0,0,0,0],[0,0,3,4,0],[0,0,2,1,0],[0,0,2,1,0],[0,2,1,0,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		{//4
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*1, y:this.row*-3, z:0}, 
			map : [[0,0,0,0,0],[0,0,2,1,0],[0,2,1,2,0],[0,3,2,5,0],[0,0,0,1,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		{//5
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*2, y:this.row*-3, z:0}, 
			map : [[0,0,0,0,0],[0,0,2,1,0],[0,2,4,0,0],[0,0,3,4,0],[0,0,2,1,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		{//6
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*-2, y:this.row*-4, z:0}, 
			map : [[0,0,0,0,0],[0,2,1,0,0],[0,5,4,0,0],[0,3,0,4,0],[0,0,3,1,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		{//7
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*-1, y:this.row*-4, z:0}, 
			map : [[0,0,0,0,0],[0,2,1,5,0],[0,0,2,1,0],[0,2,1,0,0],[0,1,0,0,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		{//8
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*0, y:this.row*-4, z:0}, 
			map : [[0,0,0,0,0],[0,0,2,4,0],[0,0,1,1,0],[0,2,3,4,0],[0,3,2,1,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		{//9
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*1, y:this.row*-4, z:0}, 
			map : [[0,0,0,0,0],[0,2,1,4,0],[0,3,2,1,0],[0,2,1,0,0],[0,1,0,0,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		},
		{//0
			cellLength : this.cellLength,
			cellSpace : this.cellSpace,
			center : {x:this.col*2, y:this.row*-4, z:0}, 
			map : [[0,0,0,0,0],[0,0,2,4,0],[0,2,1,2,0],[0,1,2,1,0],[0,3,1,0,0]],  
			mapDataNum : 5*5*2,
			colUnit : 5*2
		}
	];
	var lastMap = 0;
	for(var i=0; i<this.fontMapData.length; i++) {
		for(var j=0; j<this.fontMapData[i].map.length; j++) {
			for(var k=0; k<this.fontMapData[i].map[j].length; k++) {
				switch(this.fontMapData[i].map[j][k]) {
					case 0:
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].shade = false;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].fill = false;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].stroke = false;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].size = 0;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].position = {
							x : 0,
							y : 0,
							z : 0
						};
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].rotate = {x:0, y:0, z:0};
						break;
					case 1:
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].shade = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].fill = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].stroke = false;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].size = this.fontMapData[i].cellLength/2;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].position = {
							x : (parseInt(k)*this.fontMapData[i].cellSpace - this.fontMapData[i].map[j].length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.x,
							y : (-parseInt(j)*this.fontMapData[i].cellSpace - -this.fontMapData[i].map.length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.y,
							z : this.fontMapData[i].center.z
						};
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].rotate = {x:0, y:0, z:180};
						break;
					case 2:
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].shade = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].fill = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].stroke = false;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].size = this.fontMapData[i].cellLength/2;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].position = {
							x : (parseInt(k)*this.fontMapData[i].cellSpace - this.fontMapData[i].map[j].length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.x,
							y : (-parseInt(j)*this.fontMapData[i].cellSpace - -this.fontMapData[i].map.length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.y,
							z : this.fontMapData[i].center.z
						};
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].rotate = {x:0, y:0, z:0};
						break;
					case 3:
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].shade = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].fill = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].stroke = false;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].size = this.fontMapData[i].cellLength/2;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].position = {
							x : (parseInt(k)*this.fontMapData[i].cellSpace - this.fontMapData[i].map[j].length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.x,
							y : (-parseInt(j)*this.fontMapData[i].cellSpace - -this.fontMapData[i].map.length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.y,
							z : this.fontMapData[i].center.z
						};
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].rotate = {x:0, y:0, z:90};
						break;
					case 4:
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].shade = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].fill = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].stroke = false;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].size = this.fontMapData[i].cellLength/2;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].position = {
							x : (parseInt(k)*this.fontMapData[i].cellSpace - this.fontMapData[i].map[j].length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.x,
							y : (-parseInt(j)*this.fontMapData[i].cellSpace - -this.fontMapData[i].map.length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.y,
							z : this.fontMapData[i].center.z
						};
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].rotate = {x:0, y:0, z:270};
						break;
					case 5:
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].shade = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].fill = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].stroke = false;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].size = this.fontMapData[i].cellLength/2;
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].position = {
							x : (parseInt(k)*this.fontMapData[i].cellSpace - this.fontMapData[i].map[j].length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.x,
							y : (-parseInt(j)*this.fontMapData[i].cellSpace - -this.fontMapData[i].map.length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.y,
							z : this.fontMapData[i].center.z
						};
						this.returnData[j*this.fontMapData[i].colUnit+k*2 + lastMap].rotate = {x:0, y:0, z:180};
						
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].shade = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].fill = true;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].stroke = false;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].size = this.fontMapData[i].cellLength/2;
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].position = {
							x : (parseInt(k)*this.fontMapData[i].cellSpace - this.fontMapData[i].map[j].length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.x,
							y : (-parseInt(j)*this.fontMapData[i].cellSpace - -this.fontMapData[i].map.length*this.fontMapData[i].cellSpace/2) + this.fontMapData[i].center.y,
							z : this.fontMapData[i].center.z
						};
						this.returnData[j*this.fontMapData[i].colUnit+k*2+1 + lastMap].rotate = {x:0, y:0, z:0};
						break;
				};
			};
		};
		lastMap += this.fontMapData[i].mapDataNum;
	};
	return this.returnData;
};




var dynamic_001 = {// bold motion
	value : new Array(),
	uniqueValue : {},
	uniqueCloseValue : new closeValue(50,500),
	init : function() {
		for(var i=0; i<DEFIINE_instanceNum; i++) {
			dynamic_001.value[i] = {
				shade : null,
				fill : null,
				stroke : null,
				size: null,
				position: null,
				rotate: null
			};
		};
	},
	iteration : function() {
		for(var i=0; i<DEFIINE_instanceNum; i++) {
			dynamic_001.value[i].size = 30*Math.random();
		};
		return dynamic_001.value;
	}
};
dynamic_001.init();


var dynamic_002 = {// light motion
	value : new Array(),
	uniqueValue : {},
	uniqueCloseValue : new closeValue(50,500),
	init : function() {
		for(var i=0; i<DEFIINE_instanceNum; i++) {
			dynamic_002.value[i] = {
				shade : null,
				fill : null,
				stroke : null,
				size: null,
				position: null,
				rotate: null
			};
		};
	},
	iteration : function() {
		for(var i=0; i<DEFIINE_instanceNum; i++) {
			dynamic_002.value[i].size = Math.random()*8;
		};
		return dynamic_002.value;
	}
};
dynamic_002.init();


var dynamic_003 = {// sphere motion
	value : new Array(),
	uniqueValue : {
		masterDegree : {theta:0, phi:0},
		masterControllDegree : {theta:0, phi:0},
		masterRadius : 0,
		masterControllRadius : 200,
		cellDegree : new Array(),
	},
	uniqueCloseValue : new closeValue(50,500),
	init : function() {
		dynamic_003.masterControllRadius = Math.random()*200 + 100;
		dynamic_003.masterControllDegree = {theta:0, phi:Math.random()*10-5};
		for(var i=0; i<DEFIINE_instanceNum; i++) {
			dynamic_003.value[i] = {
				shade : null,
				fill : null,
				stroke : null,
				size: null,
				position: null,
				rotate: null
			};
			dynamic_003.uniqueValue.cellDegree[i] = {
				theta : 360 * Math.random(),
				phi : 360 * Math.random()
			};
		};
	},
	randomInit : function() {
		dynamic_003.masterControllRadius = Math.random()*150 + 150;
		dynamic_003.masterControllDegree = {theta:0, phi:Math.random()*20-10};
		for(var i=0; i<DEFIINE_instanceNum; i++) {
			dynamic_003.uniqueValue.cellDegree[i] = {
				theta : 360 * Math.random(),
				phi : 360 * Math.random()
			};
		}
	},
	iteration : function() {
		if(Math.random() < 0.03) dynamic_003.randomInit();
		dynamic_003.uniqueValue.masterRadius = dynamic_003.masterControllRadius+50*Math.random();
		dynamic_003.uniqueValue.masterDegree.phi += dynamic_003.masterControllDegree.phi;
		for(var i=0; i<DEFIINE_instanceNum; i++) {
                var ra = polarToRectangle(
                    dynamic_003.uniqueValue.cellDegree[i].theta + dynamic_003.uniqueValue.masterDegree.theta,
                    dynamic_003.uniqueValue.cellDegree[i].phi + dynamic_003.uniqueValue.masterDegree.phi,
                    dynamic_003.uniqueValue.masterRadius
                );
                dynamic_003.value[i].position = {
                    x : ra.x,
                    y : ra.y,
                    z : ra.z
                };
                dynamic_003.value[i].size = Math.random()*5;
        };
		return dynamic_003.value;
	}
};
dynamic_003.init();


var dynamic_004 = {// rotate motion
	value : new Array(),
	uniqueValue : {
		closeValue : new Array()
	},
	uniqueCloseValue : new closeValue(50,500),
	init : function() {
		for(var i=0; i<DEFIINE_instanceNum; i++) {
			dynamic_004.uniqueValue.closeValue[i] = new Object();
			dynamic_004.uniqueValue.closeValue[i].x = new closeValue(200,500);
			dynamic_004.uniqueValue.closeValue[i].y = new closeValue(200,500);
			dynamic_004.uniqueValue.closeValue[i].z = new closeValue(200,500);
			dynamic_004.value[i] = {
				shade : null,
				fill : null,
				stroke : null,
				size: null,
				position: null,
				rotate: {
					x : 0,
					y : 0,
					z :0
				}
			};
		};
	},
	iteration : function() {
		for(var i=0; i<DEFIINE_instanceNum; i++) {
			dynamic_004.value[i].rotate.x = dynamic_004.uniqueValue.closeValue[0].x.execution() * 720;
			dynamic_004.value[i].rotate.y = dynamic_004.uniqueValue.closeValue[0].y.execution() * 720;
			dynamic_004.value[i].rotate.z = dynamic_004.uniqueValue.closeValue[0].z.execution() * 720;
			dynamic_004.value[i].size = 5;
		};
		return dynamic_004.value;
	}
};
dynamic_004.init();

<!-- motion -->












<!-- effects -->

var backgroundController = {
	color : new String,
	init : function() {
		backgroundController.color = "rgba(0, 0, 0, 1)";
	},
	draw : function() {
		init.ctx.fillStyle = backgroundController.color;
		init.ctx.fillRect(0, 0, init.size.x, init.size.y);
	}
};
backgroundController.init();


var nodeStroke = {
	vertsArray : new Array(),
	color : new String(),
	init : function() {
		nodeStroke.color = {
			r : 1.0,
			g : 1.0,
			b : 1.0,
			a : 0.15
		};
	},
	iteration : function() {
		nodeStroke.vertsArray = [];
		if(shader.chromaticAberration.flag === false) {
			init.ctx.globalCompositeOperation = "source-over";
			for(var i=0; i<shader.shadeObject.length; i++) {
				for(var j=0; j<shader.shadeObject[i].face.verts.length; j++) {
					nodeStroke.vertsArray.push(shader.shadeObject[i].face.verts[j].affineOut);
				};
			};
			init.ctx.beginPath();
			for(var i=0; i<nodeStroke.vertsArray.length; i++) {
				if(Math.random() > 0.75) {
					init.ctx.lineTo(
						nodeStroke.vertsArray[i].x,
						nodeStroke.vertsArray[i].y
					);
				};
			};
			init.ctx.closePath();
					
			init.ctx.strokeStyle = "rgba(" + 
				nodeStroke.color.r*255 + "," + 
				nodeStroke.color.g*255 + "," + 
				nodeStroke.color.b*255 + "," +
				nodeStroke.color.a
			+ ")";
			init.ctx.stroke();
		} else {
			init.ctx.globalCompositeOperation = "lighter";
			init.ctx.translate(shader.chromaticAberration.r.x,shader.chromaticAberration.r.y);
			for(var i=0; i<shader.shadeObject.length; i++) {
				for(var j=0; j<shader.shadeObject[i].face.verts.length; j++) {
					nodeStroke.vertsArray.push(shader.shadeObject[i].face.verts[j].affineOut);
				};
			};
			init.ctx.beginPath();
			for(var i=0; i<nodeStroke.vertsArray.length; i++) {
				init.ctx.lineTo(
					nodeStroke.vertsArray[i].x,
					nodeStroke.vertsArray[i].y
				);
			};
			init.ctx.closePath();
					
			init.ctx.strokeStyle = "rgba(" + 
				nodeStroke.color.r*255 + "," + 
				0 + "," + 
				0 + "," +
				nodeStroke.color.a/1
			+ ")";
			init.ctx.stroke();
			init.ctx.translate(-shader.chromaticAberration.r.x,-shader.chromaticAberration.r.y);
			
			
			init.ctx.translate(shader.chromaticAberration.g.x,shader.chromaticAberration.g.y);
			for(var i=0; i<shader.shadeObject.length; i++) {
				for(var j=0; j<shader.shadeObject[i].face.verts.length; j++) {
					nodeStroke.vertsArray.push(shader.shadeObject[i].face.verts[j].affineOut);
				};
			};
			init.ctx.beginPath();
			for(var i=0; i<nodeStroke.vertsArray.length; i++) {
				init.ctx.lineTo(
					nodeStroke.vertsArray[i].x,
					nodeStroke.vertsArray[i].y
				);
			};
			init.ctx.closePath();
			init.ctx.strokeStyle = "rgba(" + 
				0 + "," + 
				nodeStroke.color.g*255 + "," + 
				0 + "," +
				nodeStroke.color.a/1.5
			+ ")";
			init.ctx.stroke();
			init.ctx.translate(-shader.chromaticAberration.g.x,-shader.chromaticAberration.g.y);
			
			
			init.ctx.translate(shader.chromaticAberration.b.x,shader.chromaticAberration.b.y);
			for(var i=0; i<shader.shadeObject.length; i++) {
				for(var j=0; j<shader.shadeObject[i].face.verts.length; j++) {
					nodeStroke.vertsArray.push(shader.shadeObject[i].face.verts[j].affineOut);
				};
			};
			init.ctx.beginPath();
			for(var i=0; i<nodeStroke.vertsArray.length; i++) {
				init.ctx.lineTo(
					nodeStroke.vertsArray[i].x,
					nodeStroke.vertsArray[i].y
				);
			};
			init.ctx.closePath();
			init.ctx.strokeStyle = "rgba(" + 
				0 + "," + 
				0 + "," + 
				nodeStroke.color.b*255 + "," +
				nodeStroke.color.a/2
			+ ")";
			init.ctx.stroke();
			init.ctx.translate(-shader.chromaticAberration.b.x,-shader.chromaticAberration.b.y);
			
		};
	}
};
nodeStroke.init();



var invertController = {
	flag : false,
	iteration : function() {
		if(invertController.flag == true) {
			light.enableLight = false;
			backgroundController.color = COLOR_CONFIG.background_and_lines.light.background;//"rgba(255,255,255,1)";
			nodeStroke.color.r = COLOR_CONFIG.background_and_lines.light.line.r;//0.0;
			nodeStroke.color.g = COLOR_CONFIG.background_and_lines.light.line.g;//0.0;
			nodeStroke.color.b = COLOR_CONFIG.background_and_lines.light.line.b;//0.0;
			for(var i=0; i<DEFIINE_instanceNum; i++) {
				instanceObject[i].fillColor.r = 1.0 - instanceObject[i].fillColor.r;
				instanceObject[i].fillColor.g = 1.0 - instanceObject[i].fillColor.g;
				instanceObject[i].fillColor.b = 1.0 - instanceObject[i].fillColor.b;
			};
		} else {
			nodeStroke.color.r = COLOR_CONFIG.background_and_lines.dark.line.r;//1.0;
			nodeStroke.color.g = COLOR_CONFIG.background_and_lines.dark.line.g;//1.0;
			nodeStroke.color.b = COLOR_CONFIG.background_and_lines.dark.line.b;//1.0;
			light.enableLight = true;
			backgroundController.color = COLOR_CONFIG.background_and_lines.dark.background;//"rgba(0,0,0,1)";
		};
	}
};


var effectCv = new closeValue(300, 500);
var effectTimer = function() {
	var effectVal = effectCv.execution();
	if(effectVal > 0.7) {
		shader.chromaticAberration.flag = true;
		shader.chromaticAberration.r.x = (effectVal-0.75)*4 * 15;
		shader.chromaticAberration.g.x = (effectVal-0.75)*4 * 0;
		shader.chromaticAberration.b.x = (effectVal-0.75)*4 * -15;
	} else if(effectVal < 0.2) {
		invertController.flag = true;
	} else {
		invertController.flag = false;
		shader.chromaticAberration.flag = false;
	};
};



var mousePosX = 0;
var mousePosY = 0;
document.body.onmousemove = function(e) {
	mousePosX = (e.pageX-init.size.x)/init.size.x * 30;
	mousePosY = (e.pageY-init.size.y)/init.size.y * 30;
};
var zoomCv = new closeValue(300, 1000);
var randomSelfCv = new closeValue(300, 400);
var rotateCv = new closeValue(300, 500);
var memRotateX = Math.random()*100;
var memRotateY = Math.random()*100;
rotateCv.smoothFlag = false;
var cameraTimer = function() {
	var zoomVal = zoomCv.execution();
	if(zoomVal > 0.8) {
		camera.zoom = 1.5
	} else if(zoomVal < 0.2) {
		camera.zoom = 2.2;
	} else {
		camera.zoom = 1;
	};
	
	var randomSelfVal = randomSelfCv.execution();
	if(randomSelfCv > 0.8) {
		camera.self.x = Math.random()*10-5;
		camera.self.y = Math.random()*10-5;
		camera.self.z = Math.random()*10-5;
	};
	memRotateX += 8;
	memRotateY += 14;
	var rotateVal = rotateCv.execution();
	if(rotateVal > 0.8) {
		camera.rotate.x = memRotateX;
		camera.rotate.y = memRotateY;
	} else {
		camera.rotate.x = 0;
		camera.rotate.y = 0;
	};
};

<!-- effects -->












<!-- controller -->

var controll = {
	value : new Array(),
	startValue : new Array(),
	endValue : new Array(),
	startFlag : new Array(),
	startTime : new Array(),
	durationTime : new Array(),
	progress : new Array(),
	processArray : new Array(),
	staticFlag : 0,
	staticMap : {
		freemap_disconnected : freemap_disconnected(),
		freemap_random : freemap_random(),
		fontMap_fullchara : fontmap_fullchara(),
		fontmap_firstTitle : fontmap_firstTitle(),
		fontmap_secondTitle : fontmap_secondTitle()
	},
	dynamicFlag : 0,
	dynamicMap : new Object,
	init : function() {
		for(var i=0; i<DEFIINE_instanceNum; i++) {
			controll.value[i] = {
				shade : false,
				fill : false,
				stroke : false,
				fillColor: {r:0, g:0, b:0, a:0},
				strokeColor: {r:0, g:0, b:0, a:0},
				size: 0,
				position: {x:Math.random()*1000-500, y:Math.random()*1000-500, z:Math.random()*1000-500},
				rotate: {x:Math.random()*1000-500, y:Math.random()*1000-500, z:Math.random()*1000-500}
			};
			controll.startValue[i] = new Object();
			controll.endValue[i] = new Object();
			controll.startFlag[i] = false;
			controll.startTime[i] = 0;
			controll.progress[i] = 0;
			controll.processArray[i] = null;
		};
	},
	startTransform : function(num, durationTime) {
		controll.startFlag[num] = true;
		controll.durationTime[num] = durationTime;
		controll.processArray[num] = controll.staticIteration;
	},
	staticIteration : function(num) {// staticIteration
		switch(controll.staticFlag) {
			case "freemap_disconnected":
				controll.endValue[num] = controll.staticMap.freemap_disconnected[num];
				break;
			case "freemap_random":
				controll.endValue[num] = controll.staticMap.freemap_random[num];
				break;
				
			case "fontmap_fullchara":
				controll.endValue[num] = controll.staticMap.fontMap_fullchara[num];
				break;
			case "fontmap_firstTitle":
				controll.endValue[num] = controll.staticMap.fontmap_firstTitle[num];
				break;
			case "fontmap_secondTitle":
				controll.endValue[num] = controll.staticMap.fontmap_secondTitle[num];
				break;
		};
		switch(controll.endValue[num].shade) {
			case true:
				if(controll.startFlag[num] == true) {
					controll.startFlag[num] = false;
					controll.startTime[num] = Date.now();
					controll.startValue[num] = controll.value[num];
					controll.value[num].shade = controll.endValue[num].shade;
					
					controll.value[num].fill = controll.endValue[num].fill;
					controll.value[num].stroke = controll.endValue[num].stroke;
				};
				controll.progress[num] = Math.min(1, (Date.now()-controll.startTime[num])/controll.durationTime[num]);
				
				if(controll.endValue[num].fillColor != null) {
					controll.value[num].fillColor.r = controll.startValue[num].fillColor.r + (controll.endValue[num].fillColor.r - controll.startValue[num].fillColor.r) * controll.progress[num];
					controll.value[num].fillColor.g = controll.startValue[num].fillColor.g + (controll.endValue[num].fillColor.g - controll.startValue[num].fillColor.g) * controll.progress[num];
					controll.value[num].fillColor.b = controll.startValue[num].fillColor.b + (controll.endValue[num].fillColor.b - controll.startValue[num].fillColor.b) * controll.progress[num];
					controll.value[num].fillColor.a = controll.startValue[num].fillColor.a + (controll.endValue[num].fillColor.a - controll.startValue[num].fillColor.a) * controll.progress[num];
				};
				if(controll.endValue[num].strokeColor != null) {
					controll.value[num].strokeColor.r = controll.startValue[num].strokeColor.r + (controll.endValue[num].strokeColor.r - controll.startValue[num].strokeColor.r) * controll.progress[num];
					controll.value[num].strokeColor.g = controll.startValue[num].strokeColor.g + (controll.endValue[num].strokeColor.g - controll.startValue[num].strokeColor.g) * controll.progress[num];
					controll.value[num].strokeColor.b = controll.startValue[num].strokeColor.b + (controll.endValue[num].strokeColor.b - controll.startValue[num].strokeColor.b) * controll.progress[num];
					controll.value[num].strokeColor.a = controll.startValue[num].strokeColor.a + (controll.endValue[num].strokeColor.a - controll.startValue[num].strokeColor.a) * controll.progress[num];
				};
				if(controll.endValue[num].size) {
					controll.value[num].size = controll.startValue[num].size + (controll.endValue[num].size - controll.startValue[num].size) * controll.progress[num];
				};
				if(controll.endValue[num].position) {
					controll.value[num].position.x = controll.startValue[num].position.x + (controll.endValue[num].position.x - controll.startValue[num].position.x) * controll.progress[num];
					controll.value[num].position.y = controll.startValue[num].position.y + (controll.endValue[num].position.y - controll.startValue[num].position.y) * controll.progress[num];
					controll.value[num].position.z = controll.startValue[num].position.z + (controll.endValue[num].position.z - controll.startValue[num].position.z) * controll.progress[num];
				};
				if(controll.endValue[num].rotate) {
					controll.value[num].rotate.x = controll.startValue[num].rotate.x + (controll.endValue[num].rotate.x - controll.startValue[num].rotate.x) * controll.progress[num];
					controll.value[num].rotate.y = controll.startValue[num].rotate.y + (controll.endValue[num].rotate.y - controll.startValue[num].rotate.y) * controll.progress[num];
					controll.value[num].rotate.z = controll.startValue[num].rotate.z + (controll.endValue[num].rotate.z - controll.startValue[num].rotate.z) * controll.progress[num];
				};
				
				if(controll.progress[num] == 1) {
					controll.processArray[num] = null;
				};
				break;
			case false:
				if(controll.startFlag[num] == true) {
					controll.startFlag[num] = false;
					controll.startTime[num] = Date.now();
					controll.startValue[num] = controll.value[num];
				};
				controll.progress[num] = Math.min(1, (Date.now()-controll.startTime[num])/controll.durationTime[num]);
				
				if(controll.endValue[num].fillColor != null) {
					controll.value[num].fillColor.r = controll.startValue[num].fillColor.r + (controll.endValue[num].fillColor.r - controll.startValue[num].fillColor.r) * controll.progress[num];
					controll.value[num].fillColor.g = controll.startValue[num].fillColor.g + (controll.endValue[num].fillColor.g - controll.startValue[num].fillColor.g) * controll.progress[num];
					controll.value[num].fillColor.b = controll.startValue[num].fillColor.b + (controll.endValue[num].fillColor.b - controll.startValue[num].fillColor.b) * controll.progress[num];
					controll.value[num].fillColor.a = controll.startValue[num].fillColor.a + (controll.endValue[num].fillColor.a - controll.startValue[num].fillColor.a) * controll.progress[num];
				};
				if(controll.endValue[num].strokeColor != null) {
					controll.value[num].strokeColor.r = controll.startValue[num].strokeColor.r + (controll.endValue[num].strokeColor.r - controll.startValue[num].strokeColor.r) * controll.progress[num];
					controll.value[num].strokeColor.g = controll.startValue[num].strokeColor.g + (controll.endValue[num].strokeColor.g - controll.startValue[num].strokeColor.g) * controll.progress[num];
					controll.value[num].strokeColor.b = controll.startValue[num].strokeColor.b + (controll.endValue[num].strokeColor.b - controll.startValue[num].strokeColor.b) * controll.progress[num];
					controll.value[num].strokeColor.a = controll.startValue[num].strokeColor.a + (controll.endValue[num].strokeColor.a - controll.startValue[num].strokeColor.a) * controll.progress[num];
				};
				if(controll.endValue[num].size != null) {
					controll.value[num].size = controll.startValue[num].size + (controll.endValue[num].size - controll.startValue[num].size) * controll.progress[num];
				};
				if(controll.endValue[num].position != null) {
					controll.value[num].position.x = controll.startValue[num].position.x + (controll.endValue[num].position.x - controll.startValue[num].position.x) * controll.progress[num];
					controll.value[num].position.y = controll.startValue[num].position.y + (controll.endValue[num].position.y - controll.startValue[num].position.y) * controll.progress[num];
					controll.value[num].position.z = controll.startValue[num].position.z + (controll.endValue[num].position.z - controll.startValue[num].position.z) * controll.progress[num];
				};
				if(controll.endValue[num].rotate != null) {
					controll.value[num].rotate.x = controll.startValue[num].rotate.x + (controll.endValue[num].rotate.x - controll.startValue[num].rotate.x) * controll.progress[num];
					controll.value[num].rotate.y = controll.startValue[num].rotate.y + (controll.endValue[num].rotate.y - controll.startValue[num].rotate.y) * controll.progress[num];
					controll.value[num].rotate.z = controll.startValue[num].rotate.z + (controll.endValue[num].rotate.z - controll.startValue[num].rotate.z) * controll.progress[num];
				};
				
				if(controll.progress[num] == 1) {
					controll.value[num].fill = controll.endValue[num].fill;
					controll.value[num].stroke = controll.endValue[num].stroke;
					controll.value[num].shade = controll.endValue[num].shade;
					controll.processArray[num] = null;
				};
				break;
		};
	},
	dynamicTimer : function() {
		switch(controll.dynamicFlag) {
			case 0:
				controll.dynamicMap = null;
				break;
			case 1:
				controll.dynamicMap = dynamic_001.iteration();
				break;
			case 2:
				controll.dynamicMap = dynamic_002.iteration();
				break;
			case 3:
				controll.dynamicMap = dynamic_003.iteration();
				break;
			case 4:
				controll.dynamicMap = dynamic_004.iteration();
				break;
		};
		if(controll.dynamicMap != null) {
			for(var i=0; i<DEFIINE_instanceNum; i++) {
				//boolean
				if(controll.dynamicMap[i].shade != null) controll.value[i].shade = controll.dynamicMap[i].shade;
				if(controll.dynamicMap[i].fill != null) controll.value[i].fill = controll.dynamicMap[i].fill;
				if(controll.dynamicMap[i].stroke != null) controll.value[i].stroke = controll.dynamicMap[i].stroke;
				
				//number
				if(controll.dynamicMap[i].fillColor != null) {
					if(controll.dynamicMap[i].fillColor.r != null) controll.value[i].fillColor.r = controll.value[i].fillColor.r + (controll.dynamicMap[i].fillColor.r - controll.value[i].fillColor.r)/4;
					if(controll.dynamicMap[i].fillColor.g != null) controll.value[i].fillColor.g = controll.value[i].fillColor.g + (controll.dynamicMap[i].fillColor.g - controll.value[i].fillColor.g)/4;
					if(controll.dynamicMap[i].fillColor.b != null) controll.value[i].fillColor.b = controll.value[i].fillColor.b + (controll.dynamicMap[i].fillColor.b - controll.value[i].fillColor.b)/4;
					if(controll.dynamicMap[i].fillColor.a != null) controll.value[i].fillColor.a = controll.value[i].fillColor.a + (controll.dynamicMap[i].fillColor.a - controll.value[i].fillColor.a)/4;
				};
				if(controll.dynamicMap[i].strokeColor != null) {
					if(controll.dynamicMap[i].strokeColor.r != null) controll.value[i].strokeColor.r = controll.value[i].strokeColor.r + (controll.dynamicMap[i].strokeColor.r - controll.value[i].strokeColor.r)/4;
					if(controll.dynamicMap[i].strokeColor.g != null) controll.value[i].strokeColor.g = controll.value[i].strokeColor.g + (controll.dynamicMap[i].strokeColor.g - controll.value[i].strokeColor.g)/4;
					if(controll.dynamicMap[i].strokeColor.b != null) controll.value[i].strokeColor.b = controll.value[i].strokeColor.b + (controll.dynamicMap[i].strokeColor.b - controll.value[i].strokeColor.b)/4;
					if(controll.dynamicMap[i].strokeColor.a != null) controll.value[i].strokeColor.a = controll.value[i].strokeColor.a + (controll.dynamicMap[i].strokeColor.a - controll.value[i].strokeColor.a)/4;
				};
				if(controll.dynamicMap[i].size != null) {
					controll.value[i].size = controll.value[i].size + (controll.dynamicMap[i].size-controll.value[i].size)/4;
				};
				if(controll.dynamicMap[i].position != null) {
					if(controll.dynamicMap[i].position.x != null) controll.value[i].position.x = controll.value[i].position.x + (controll.dynamicMap[i].position.x-controll.value[i].position.x)/4;
					if(controll.dynamicMap[i].position.y != null) controll.value[i].position.y = controll.value[i].position.y + (controll.dynamicMap[i].position.y-controll.value[i].position.y)/4;
					if(controll.dynamicMap[i].position.z != null) controll.value[i].position.z = controll.value[i].position.z + (controll.dynamicMap[i].position.z-controll.value[i].position.z)/4;
				};
				if(controll.dynamicMap[i].rotate != null) {
					if(controll.dynamicMap[i].rotate.x != null) controll.value[i].rotate.x = controll.value[i].rotate.x + (controll.dynamicMap[i].rotate.x-controll.value[i].rotate.x)/4;
					if(controll.dynamicMap[i].rotate.y != null) controll.value[i].rotate.y = controll.value[i].rotate.y + (controll.dynamicMap[i].rotate.y-controll.value[i].rotate.y)/4;
					if(controll.dynamicMap[i].rotate.z != null) controll.value[i].rotate.z = controll.value[i].rotate.z + (controll.dynamicMap[i].rotate.z-controll.value[i].rotate.z)/4;
				};
			};
		};
	}
};
controll.init();




var staticTransformSeries = function(t) {
	var inc = 0;
	var to = function() {
		setTimeout(function() {
			controll.startTransform(inc, t);
			inc++;
			if(inc < DEFIINE_instanceNum) {
				to();
			};
		}, 0);
	};
	to();
};
var staticTransformParallel = function(t) {
	for(var i=0; i<DEFIINE_instanceNum; i++) {
		controll.startTransform(i, t);
	};
};

<!-- controller -->














//ここでループしてる

FPS = 1000 / 30;

objectInit();
var loop = function() {
	cameraTimer();
	
	init.ctx.clearRect(0, 0, init.size.x, init.size.y);
	backgroundController.draw();
	shader.shadeObject = [];
	for(var i=0; i<controll.processArray.length; i++) if(controll.processArray[i] != null) controll.processArray[i](i);
	controll.dynamicTimer();
	objectUpdate();
	shader.zSort();
	shader.flatShader.directionalLighting();
	
	invertController.iteration();
	effectTimer();
	if(init.nodeStrokeFlag == true) nodeStroke.iteration();
	
	shader.execution();
};

var IS_END = false;

var timerIteration = function() {
	setTimeout(function() {
		loop();
		if (!IS_END) timerIteration();
	}, FPS);//デフォ30
};
timerIteration();




// var motionSet = [
// 	{
// 		time : 500,
// 		func : function() {
// 			init.nodeStrokeFlag = true;
// 			controll.staticFlag = "fontmap_firstTitle";
// 			staticTransformSeries(1000);
// 		}
// 	},
// 	{
// 		time : 3000,
// 		func : function() {
// 			for(var i=0; i<DEFIINE_instanceNum; i++) {
// 				instanceObject[i].uniqueFlag001 = true;
// 			};
// 		}
// 	},
// 	{
// 		time : 1000,
// 		func : function() {
// 			controll.staticFlag = "freemap_disconnected";
// 			staticTransformSeries(800);
// 		}
// 	},



// 	{
// 		time : 2500,
// 		func : function() {
// 			for(var i=0; i<DEFIINE_instanceNum; i++) {
// 				instanceObject[i].uniqueFlag001 = false;
// 			};
// 			controll.dynamicFlag = 0;
// 			init.nodeStrokeFlag = false;
// 			controll.staticFlag = "fontmap_secondTitle";
// 			staticTransformSeries(300);
// 		}
// 	},


// 	{
// 		time : 2500,
// 		func : function() {
// 			controll.staticFlag = "freemap_random";
// 			staticTransformParallel(1000);
// 		}
// 	},
// 	{
// 		time : 1000,
// 		func : function() {
// 			init.nodeStrokeFlag = true;
// 			controll.dynamicFlag = 3;
// 		}
// 	},
	
// 	{
// 		time : 2000,
// 		func : function() {
// 			controll.staticFlag = "fontmap_firstTitle";
// 			staticTransformSeries(500);
// 		}
// 	},
// 	{
// 		time : 2000,
// 		func : function() {
// 			controll.staticFlag = "fontmap_firstTitle";
// 			staticTransformSeries(500);
// 		}
// 	},
// 	{
// 		time : 2000,
// 		func : function() {
// 			controll.staticFlag = "freemap_random";
// 			staticTransformSeries(800);
// 		}
// 	},
// 	{
// 		time : 2500,
// 		func : function() {
// 			controll.staticFlag = "freemap_random";
// 			staticTransformSeries(800);
// 		}
// 	},
// 	{
// 		time : 2000,
// 		func : function() {
// 			controll.staticFlag = "freemap_random";
// 			staticTransformSeries(800);
// 		}
// 	},
// 	{
// 		time : 3000,
// 		func : function() {
// 			controll.staticFlag = "freemap_disconnected";
// 			staticTransformSeries(500);
// 		}
// 	},
// 	{
// 		time : 1500,
// 		func : function() {
// 			init.nodeStrokeFlag = false;
// 			controll.dynamicFlag = 0;
// 			controll.staticFlag = "fontmap_fullchara";
// 			staticTransformParallel(1000);
// 		}
// 	},
// 	{
// 		time : 1500,
// 		func : function() {
// 			controll.dynamicFlag = 1;
// 		}
// 	},
// 	{
// 		time : 2000,
// 		func : function() {
// 			controll.dynamicFlag = 2;
// 		}
// 	},
// 	{
// 		time : 1500,
// 		func : function() {
// 			controll.dynamicFlag = 1;
// 		}
// 	},
// 	{
// 		time : 1500,
// 		func : function() {
// 			init.nodeStrokeFlag = true;
// 			controll.dynamicFlag = 4;
// 		}
// 	},
// 	{
// 		time : 2500,
// 		func : function() {
// 			init.nodeStrokeFlag = false;
// 			controll.dynamicFlag = 0;
// 			controll.staticFlag = "fontmap_fullchara";
// 			staticTransformParallel(1000);
// 		}
// 	},
// 	{
// 		time : 2000,
// 		func : function() {
// 			init.nodeStrokeFlag = true;
// 			controll.dynamicFlag = 0;
// 			controll.staticFlag = "freemap_disconnected";
// 			staticTransformSeries(800);
// 		}
// 	},
// 	{
// 		time : 10000,
// 		func : function() {
// 		}
// 	},
// ];




var motionSet = [


	{
		time : 500,
		func : function() {
			for(var i=0; i<DEFIINE_instanceNum; i++) {
				instanceObject[i].uniqueFlag001 = false;
			};
			controll.dynamicFlag = 0;
			init.nodeStrokeFlag = false;
			controll.staticFlag = "fontmap_secondTitle";
			staticTransformSeries(100);//うごき
		}
	},

	{
		time : 3700,
		func : function() {
			controll.staticFlag = "freemap_random";
			staticTransformParallel(400);
		}
	},




	{
		time : 600,
		func : function() {
			init.nodeStrokeFlag = true;
			controll.staticFlag = "fontmap_firstTitle";
			staticTransformSeries(100);
		}
	},

	{
		time : 3000,
		func : function() {
			for(var i=0; i<DEFIINE_instanceNum; i++) {
				instanceObject[i].uniqueFlag001 = true;
			};
		}
	},


	{
		time : 3000,
		func : function() {
			controll.staticFlag = "freemap_random";
			staticTransformSeries(800);
		}
	},
	{
		time : 3000,
		func : function() {
		}
	},

	// {
	// 	time : 500,
	// 	func : function() {
	// 		init.nodeStrokeFlag = false;
	// 		controll.dynamicFlag = 2;
	// 		controll.staticFlag = "fontmap_firstTitle";
	// 		staticTransformSeries(50);
	// 	}
	// },


	// {
	// 	time : 2000,
	// 	func : function() {
	// 		controll.staticFlag = "fontmap_firstTitle";
	// 		staticTransformSeries(500);
	// 	}
	// },



	// {
	// 	time : 2500,
	// 	func : function() {
	// 		controll.staticFlag = "freemap_random";
	// 		staticTransformSeries(800);
	// 	}
	// },
	// {
	// 	time : 2000,
	// 	func : function() {
	// 		controll.staticFlag = "freemap_random";
	// 		staticTransformSeries(800);
	// 	}
	// },
	// {
	// 	time : 3000,
	// 	func : function() {
	// 		controll.staticFlag = "freemap_disconnected";
	// 		staticTransformSeries(500);
	// 	}
	// },
	// {
	// 	time : 1500,
	// 	func : function() {
	// 		init.nodeStrokeFlag = false;
	// 		controll.dynamicFlag = 0;
	// 		controll.staticFlag = "fontmap_fullchara";
	// 		staticTransformParallel(1000);
	// 	}
	// },
	// {
	// 	time : 1500,
	// 	func : function() {
	// 		controll.dynamicFlag = 1;
	// 	}
	// },
	// {
	// 	time : 2000,
	// 	func : function() {
	// 		controll.dynamicFlag = 2;
	// 	}
	// },
	// {
	// 	time : 1500,
	// 	func : function() {
	// 		controll.dynamicFlag = 1;
	// 	}
	// },
	// {
	// 	time : 1500,
	// 	func : function() {
	// 		init.nodeStrokeFlag = true;
	// 		controll.dynamicFlag = 4;
	// 	}
	// },
	// {
	// 	time : 2500,
	// 	func : function() {
	// 		init.nodeStrokeFlag = false;
	// 		controll.dynamicFlag = 0;
	// 		controll.staticFlag = "fontmap_fullchara";
	// 		staticTransformParallel(1000);
	// 	}
	// },
	// {
	// 	time : 2000,
	// 	func : function() {
	// 		init.nodeStrokeFlag = true;
	// 		controll.dynamicFlag = 0;
	// 		controll.staticFlag = "freemap_disconnected";
	// 		staticTransformSeries(800);
	// 	}
	// },
	// {
	// 	time : 1000,
	// 	func : function() {
	// 	}
	// },
];






var motionSet = [
	{
		time : 500,
		func : function() {
			init.nodeStrokeFlag = true;
			controll.staticFlag = "fontmap_secondTitle";
			staticTransformSeries(1000);
		}
	},
	{
		time : 3000,
		func : function() {
			for(var i=0; i<DEFIINE_instanceNum; i++) {
				instanceObject[i].uniqueFlag001 = true;
			};
		}
	},
	{
		time : 1000,
		func : function() {
			controll.staticFlag = "freemap_disconnected";
			staticTransformSeries(800);
		}
	},


	{
		time : 2500,
		func : function() {
			for(var i=0; i<DEFIINE_instanceNum; i++) {
				instanceObject[i].uniqueFlag001 = false;
			};
			controll.dynamicFlag = 0;
			init.nodeStrokeFlag = false;
			controll.staticFlag = "fontmap_firstTitle";
			staticTransformSeries(300);
		}
	},


	{
		time : 2500,
		func : function() {
			controll.staticFlag = "freemap_random";
			staticTransformParallel(1000);
		}
	},
	{
		time : 1000,
		func : function() {
		}
	},
	
];




var ENABLE_INFINITY_LOOP = false;

var motionIndex = 0;

var motionChanger = function() {
	setTimeout(function() {
		motionSet[motionIndex].func();
		motionIndex++;

		if(motionSet.length == motionIndex){
			if (ENABLE_INFINITY_LOOP){
				motionIndex = 0;
			}
			else {
				//ここで止める
				IS_END = true;
			}
		}
		if (!IS_END) motionChanger();
	}, motionSet[motionIndex].time);
};

motionChanger();

