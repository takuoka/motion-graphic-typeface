# フレームワーク化したい
# TODO　文字を変える
# TODO  色をカラフルにする　　文字の色、背景の色など

# init -->
window.onresize = ->
	console.log window.innerWidth
	init.size.x = window.innerWidth
	init.size.y = window.innerHeight
	init.canvas.width = init.size.x
	init.canvas.width = init.size.x
	camera.display.x = init.size.x / 2
	camera.display.y = init.size.y / 2
	return

init =
	canvas: new Object()
	ctx: new Object()
	size: new Object()
	nodeStrokeFlag: false
	canvasSetup: ->
		init.canvas = document.getElementById("canvas")
		init.size.x = window.innerWidth
		init.size.y = window.innerWidth
		init.canvas.width = init.size.x
		init.canvas.height = init.size.y
		init.ctx = init.canvas.getContext("2d")
		return

init.canvasSetup()

# init -->
# utilities -->
dtr = (d) ->
	d * Math.PI / 180

ceiling = (num) ->
	parseInt(num * 10000) / 10000


#polarToRectangle
polarToRectangle = (dX, dY, radius) ->
	x = Math.sinE0(dtr(dX)) * Math.cosE0(dtr(dY)) * radius
	y = Math.sinE0(dtr(dX)) * Math.sinE0(dtr(dY)) * radius
	z = Math.cosE0(dtr(dX)) * radius
	x: y
	y: z
	z: x


#rectangleToPolar
rectangleToPolar = (x, y, z) ->
	if x is 0
		xD = 0.001
	else
		xD = x
	if y is 0
		yD = 0.001
	else
		yD = y
	if z is 0
		zD = 0.001
	else
		zD = z
	radius = Math.sqrt(xD * xD + yD * yD + zD * zD)
	theta = Math.atan(zD / Math.sqrt(xD * xD + yD * yD))
	phi = Math.atan(yD / xD)
	x: theta * (180 / Math.PI)
	y: phi * (180 / Math.PI)
	r: radius

Math.sinE0 = (val) ->
	if val is 0
		return Math.sin(0.000001)
	else
		return Math.sin(val)
	return

Math.cosE0 = (val) ->
	if val is 0
		return Math.cos(0.000001)
	else
		return Math.cos(val)
	return

Math.getVector = (startVertex, endVertex) ->
	x: endVertex.affineOut.x - startVertex.affineOut.x
	y: endVertex.affineOut.y - startVertex.affineOut.y
	z: endVertex.affineOut.z - startVertex.affineOut.z

Math.getCross = (vector1, vector2) ->
	x: vector1.y * vector2.z - vector1.z * vector2.y
	y: vector1.z * vector2.x - vector1.x * vector2.z
	z: vector1.x * vector2.y - vector1.y * vector2.x

Math.getNormal = (cross3d) ->
	length = Math.sqrt(cross3d.x * cross3d.x + cross3d.y * cross3d.y + cross3d.z * cross3d.z)
	x: cross3d.x / length
	y: cross3d.y / length
	z: cross3d.z / length

getNormal = (vectorSet0, vectorSet1) ->
	vector1 = Math.getVector(vectorSet0[0], vectorSet0[1])
	vector2 = Math.getVector(vectorSet1[0], vectorSet1[1])
	cross = Math.getCross(vector1, vector2)
	normal = Math.getNormal(cross)
	normal

Math.getDot = (vector1, vector2) ->
	vector1.x * vector2.x + vector1.y * vector2.y + vector1.z * vector2.z

closeValue = (minTime, maxTime) ->
	@flag = 0
	@progress = 0
	@startTime = 0
	@durationTime = 0
	@fromValue = 0
	@toValue = 0
	@smoothFlag = true
	@minValue = 0
	@maxValue = 1
	@minDuration = minTime
	@maxDuration = maxTime
	return

closeValue:: =
	init: ->
		@durationTime = @minDuration + (@maxDuration - @minDuration) * Math.random()
		@startTime = Date.now()
		@progress = Math.min(1, ((Date.now() - @startTime) / @durationTime))
		if @smoothFlag is true
			@fromValue = @toValue
		else
			@fromValue = Math.random()
		@toValue = @minValue + @maxValue * Math.random()
		@flag = 1
		@fromValue + (@toValue - @fromValue) * @progress

	update: ->
		@progress = Math.min(1, ((Date.now() - @startTime) / @durationTime))
		@flag = 0  if @progress is 1
		@fromValue + (@toValue - @fromValue) * @progress

	execution: ->
		if @flag is 0
			return @init()
		else return @update()  if @flag is 1
		return


# utilities -->

# 3D pipeline -->
camera =
	focus: 750
	self:
		x: 0
		y: 0
		z: 100

	rotate:
		x: 0
		y: 0
		z: 0

	zoom: 1
	display:
		x: init.size.x / 2
		y: init.size.y / 2
		z: 0

	clipPlane:
		near: 0
		far: 1000

	enableCulling: false

affine =
	world:
		size: (p, size) ->
			x: p.x * size.x
			y: p.y * size.y
			z: p.z * size.z

		rotate:
			x: (p, rotate) ->
				x: p.x
				y: p.y * Math.cosE0(dtr(rotate.x)) - p.z * Math.sinE0(dtr(rotate.x))
				z: p.y * Math.sinE0(dtr(rotate.x)) + p.z * Math.cosE0(dtr(rotate.x))

			y: (p, rotate) ->
				x: p.x * Math.cosE0(dtr(rotate.y)) + p.z * Math.sinE0(dtr(rotate.y))
				y: p.y
				z: -p.x * Math.sinE0(dtr(rotate.y)) + p.z * Math.cosE0(dtr(rotate.y))

			z: (p, rotate) ->
				x: p.x * Math.cosE0(dtr(rotate.z)) - p.y * Math.sinE0(dtr(rotate.z))
				y: p.x * Math.sinE0(dtr(rotate.z)) + p.y * Math.cosE0(dtr(rotate.z))
				z: p.z

		position: (p, position) ->
			x: p.x + position.x
			y: p.y + position.y
			z: p.z + position.z

	view:
		point: (p) ->
			x: p.x - camera.self.x
			y: p.y - camera.self.y
			z: p.z - camera.self.z

		x: (p) ->
			x: p.x
			y: p.y * Math.cosE0(dtr(camera.rotate.x)) - p.z * Math.sinE0(dtr(camera.rotate.x))
			z: p.y * Math.sinE0(dtr(camera.rotate.x)) + p.z * Math.cosE0(dtr(camera.rotate.x))

		y: (p) ->
			x: p.x * Math.cosE0(dtr(camera.rotate.y)) + p.z * Math.sinE0(dtr(camera.rotate.y))
			y: p.y
			z: p.x * -Math.sinE0(dtr(camera.rotate.y)) + p.z * Math.cosE0(dtr(camera.rotate.y))

		viewReset: (p) ->
			x: p.x - camera.self.x
			y: p.y - camera.self.y
			z: p.z - camera.self.z

		righthandedReversal: (p) ->
			x: p.x
			y: -p.y
			z: p.z

	perspective: (p) ->
		x: p.x * ((camera.focus - camera.self.z) / ((camera.focus - camera.self.z) - p.z)) * camera.zoom
		y: p.y * ((camera.focus - camera.self.z) / ((camera.focus - camera.self.z) - p.z)) * camera.zoom
		z: p.z * ((camera.focus - camera.self.z) / ((camera.focus - camera.self.z) - p.z)) * camera.zoom
		p: ((camera.focus - camera.self.z) / ((camera.focus - camera.self.z) - p.z)) * camera.zoom

	display: (p, display) ->
		x: p.x + display.x
		y: p.y + display.y
		z: p.z + display.z
		p: p.p

	process: (model, size, rotate, position, display) ->
		ret = affine.world.size(model, size)
		ret = affine.world.rotate.x(ret, rotate)
		ret = affine.world.rotate.y(ret, rotate)
		ret = affine.world.rotate.z(ret, rotate)
		ret = affine.world.position(ret, position)
		ret = affine.view.point(ret)
		ret = affine.view.x(ret)
		ret = affine.view.y(ret)
		ret = affine.view.viewReset(ret)
		ret = affine.view.righthandedReversal(ret)
		ret = affine.perspective(ret)
		ret = affine.display(ret, display)
		ret

light =
	enableLight: true
	ambientLight:
		color:
			r: 1.0
			g: 1.0
			b: 1.0

		intensity: 0.0

	directionalLight:
		degree:
			x: 0
			y: 0
			z: 1

		color:
			r: 1.0
			g: 1.0
			b: 1.0

		intensity: 1.0

vertex3d = (param) ->
	@affineIn = new Object
	@affineOut = new Object
	@affineIn.vertex = (
		x: 0
		y: 0
		z: 0
	 or param.vertex)
	@affineIn.size = (
		x: 1
		y: 1
		z: 1
	 or param.size)
	@affineIn.rotate = (
		x: 0
		y: 0
		z: 0
	 or param.rotate)
	@affineIn.position = (
		x: 0
		y: 0
		z: 0
	 or param.position)
	return

vertex3d:: = vertexUpdate: ->
	@affineOut = affine.process(@affineIn.vertex, @affineIn.size, @affineIn.rotate, @affineIn.position, camera.display)
	return

getFace = (verts) ->
	verts: [
		verts[0]
		verts[1]
		verts[2]
	]
	normal: getNormal([
		verts[1]
		verts[0]
	], [
		verts[2]
		verts[0]
	])
	zIndex: verts[0].affineOut.p + verts[1].affineOut.p + verts[2].affineOut.p

shader =
	shadeObject: new Array()
	chromaticAberration:
		flag: false
		r:
			x: 3
			y: 0

		g:
			x: 0
			y: 0

		b:
			x: -3
			y: 0

	zSort: ->
		shader.shadeObject.sort (a, b) ->
			return -1  if a.face.zIndex < b.face.zIndex
			return 1  if a.face.zIndex > b.face.zIndex
			0

		return

	flatShader:
		directionalLighting: ->
			if light.enableLight is true
				i = 0

				while i < shader.shadeObject.length
					lambertReflectance = Math.getDot(
						x: ceiling(shader.shadeObject[i].face.normal.x)
						y: ceiling(shader.shadeObject[i].face.normal.y)
						z: ceiling(shader.shadeObject[i].face.normal.z)
					,
						x: light.directionalLight.degree.x
						y: light.directionalLight.degree.y
						z: light.directionalLight.degree.z
					)
					shader.shadeObject[i].fillColor =
						r: (light.directionalLight.color.r * lambertReflectance) * ((shader.shadeObject[i].fillColor.r + light.ambientLight.color.r) / 2) + light.ambientLight.intensity
						g: (light.directionalLight.color.g * lambertReflectance) * ((shader.shadeObject[i].fillColor.g + light.ambientLight.color.g) / 2) + light.ambientLight.intensity
						b: (light.directionalLight.color.b * lambertReflectance) * ((shader.shadeObject[i].fillColor.b + light.ambientLight.color.b) / 2) + light.ambientLight.intensity
						a: shader.shadeObject[i].fillColor.a

					shader.shadeObject[i].strokeColor =
						r: (light.directionalLight.color.r * lambertReflectance) * ((shader.shadeObject[i].strokeColor.r + light.ambientLight.color.r) / 2) + light.ambientLight.intensity
						g: (light.directionalLight.color.g * lambertReflectance) * ((shader.shadeObject[i].strokeColor.g + light.ambientLight.color.g) / 2) + light.ambientLight.intensity
						b: (light.directionalLight.color.b * lambertReflectance) * ((shader.shadeObject[i].strokeColor.b + light.ambientLight.color.b) / 2) + light.ambientLight.intensity
						a: shader.shadeObject[i].strokeColor.a
					i++
			return

	fillShade: (augumentColor) ->
		init.ctx.fillStyle = "rgba(" + parseInt(augumentColor.r * 255) + "," + parseInt(augumentColor.g * 255) + "," + parseInt(augumentColor.b * 255) + "," + augumentColor.a + ")"
		init.ctx.fill()
		return

	strokeShade: (augumentColor) ->
		init.ctx.lineWidth = 0.3
		init.ctx.strokeStyle = "rgba(" + parseInt(augumentColor.r * 255) + "," + parseInt(augumentColor.g * 255) + "," + parseInt(augumentColor.b * 255) + "," + augumentColor.a + ")"
		init.ctx.stroke()
		return

	shade: (color) ->
		i = 0

		while i < shader.shadeObject.length
			if shader.shadeObject[i].face.normal.z > 0 and shader.shadeObject[i].face.zIndex < 7 and shader.shadeObject[i].face.zIndex > 0
				init.ctx.beginPath()
				j = 0

				while j < shader.shadeObject[i].face.verts.length
					if j is 0
						init.ctx.moveTo shader.shadeObject[i].face.verts[j].affineOut.x, shader.shadeObject[i].face.verts[j].affineOut.y
					else
						init.ctx.lineTo shader.shadeObject[i].face.verts[j].affineOut.x, shader.shadeObject[i].face.verts[j].affineOut.y
					j++
				init.ctx.closePath()
				switch color
					when "r"
						if shader.shadeObject[i].fill is true
							shader.fillShade
								r: shader.shadeObject[i].fillColor.r
								g: 0
								b: 0
								a: shader.shadeObject[i].fillColor.a

						if shader.shadeObject[i].stroke is true
							shader.strokeShade
								r: shader.shadeObject[i].strokeColor.r
								g: 0
								b: 0
								a: shader.shadeObject[i].strokeColor.a

					when "g"
						if shader.shadeObject[i].fill is true
							shader.fillShade
								r: 0
								g: shader.shadeObject[i].fillColor.g
								b: 0
								a: shader.shadeObject[i].fillColor.a

						if shader.shadeObject[i].stroke is true
							shader.strokeShade
								r: 0
								g: shader.shadeObject[i].strokeColor.g
								b: 0
								a: shader.shadeObject[i].strokeColor.a

					when "b"
						if shader.shadeObject[i].fill is true
							shader.fillShade
								r: 0
								g: 0
								b: shader.shadeObject[i].fillColor.b
								a: shader.shadeObject[i].fillColor.a

						if shader.shadeObject[i].stroke is true
							shader.strokeShade
								r: 0
								g: 0
								b: shader.shadeObject[i].strokeColor.b
								a: shader.shadeObject[i].strokeColor.a

					else
						shader.fillShade shader.shadeObject[i].fillColor  if shader.shadeObject[i].fill is true
						shader.strokeShade shader.shadeObject[i].strokeColor  if shader.shadeObject[i].stroke is true
			i++
		return

	execution: ->
		init.ctx.save()
		if shader.chromaticAberration.flag is false
			init.ctx.globalCompositeOperation = "source-over"
			shader.shade()
		else
			init.ctx.globalCompositeOperation = "lighter"
			init.ctx.translate shader.chromaticAberration.r.x, shader.chromaticAberration.r.y
			shader.shade "r"
			init.ctx.translate -shader.chromaticAberration.r.x, -shader.chromaticAberration.r.y
			init.ctx.translate shader.chromaticAberration.g.x, shader.chromaticAberration.g.y
			shader.shade "g"
			init.ctx.translate -shader.chromaticAberration.g.x, -shader.chromaticAberration.g.y
			init.ctx.translate shader.chromaticAberration.b.x, shader.chromaticAberration.b.y
			shader.shade "b"
			init.ctx.translate -shader.chromaticAberration.b.x, -shader.chromaticAberration.b.y
		init.ctx.restore()
		return


# 3D pipeline -->

# model -->
isoscelesRightTriangle = (argument) ->
	
	# base object
	@vertices = new Object()
	@shadeObjects = new Object()
	
	# model parameter
	@shade = argument.shade
	@fill = argument.fill
	@stroke = argument.stroke
	@fillColor = argument.fillColor
	@strokeColor = argument.strokeColor
	@size = argument.size
	@position = argument.position
	@rotate = argument.rotate
	@uniqueFlag001 = false
	
	#model data
	@vertexData =
		v0:
			x: 1
			y: 1
			z: 1

		v1:
			x: 1
			y: -1
			z: 1

		v2:
			x: -1
			y: -1
			z: 1

		v3:
			x: 1
			y: -1
			z: -1

	@indexData =
		f0: [
			"v0"
			"v1"
			"v2"
		]
		f1: [
			"v0"
			"v3"
			"v1"
		]
		f2: [
			"v0"
			"v2"
			"v3"
		]
		f3: [
			"v1"
			"v3"
			"v2"
		]

	
	# vertices init
	for i of @vertexData
		@vertices[i] = new vertex3d(
			position: @position
			vertex:
				x: @vertexData[i].x * @size
				y: @vertexData[i].y * @size
				z: @vertexData[i].z * @size
		)
		@vertices[i].vertexUpdate()
	
	# shadeObjects init
	for i of @indexData
		@shadeObjects[i] = new Object
		@shadeObjects[i].face = new Object
		@shadeObjects[i].fill = @fill
		@shadeObjects[i].stroke = @stroke
		@shadeObjects[i].fillColor = @fillColor
		@shadeObjects[i].strokeColor = @strokeColor
	return

isoscelesRightTriangle:: =
	controll: (argument) ->
		@shade = argument.shade
		if @shade is true
			@fill = argument.fill
			@stroke = argument.stroke
			@size = argument.size  if argument.size
			if argument.fillColor
				@fillColor =
					r: argument.fillColor.r
					g: argument.fillColor.g
					b: argument.fillColor.b
					a: argument.fillColor.a
			if argument.strokeColor
				@strokeColor =
					r: argument.strokeColor.r
					g: argument.strokeColor.g
					b: argument.strokeColor.b
					a: argument.strokeColor.a
			if argument.position
				@position =
					x: argument.position.x
					y: argument.position.y
					z: argument.position.z
			if argument.rotate
				@rotate =
					x: argument.rotate.x
					y: argument.rotate.y
					z: argument.rotate.z
		return

	update: ->
		if @shade is true
			for i of @vertexData
				if @uniqueFlag001 is false
					@vertices[i].affineIn.vertex =
						x: @vertexData[i].x * @size
						y: @vertexData[i].y * @size
						z: @vertexData[i].z * @size
				else
					@vertices[i].affineIn.vertex =
						x: @vertexData[i].x * @size * (0.8 * Math.random() + 0.5)
						y: @vertexData[i].y * @size * (0.8 * Math.random() + 0.5)
						z: @vertexData[i].z * @size * (0.8 * Math.random() + 0.5)
				@vertices[i].affineIn.position =
					x: @position.x
					y: @position.y
					z: @position.z

				@vertices[i].affineIn.rotate =
					x: @rotate.x
					y: @rotate.y
					z: @rotate.z

				@vertices[i].vertexUpdate()
			for i of @indexData
				@shadeObjects[i].face = getFace([
					@vertices[@indexData[i][0]]
					@vertices[@indexData[i][1]]
					@vertices[@indexData[i][2]]
				])
				@shadeObjects[i].fill = @fill
				@shadeObjects[i].stroke = @stroke
				@shadeObjects[i].fillColor = @fillColor
				@shadeObjects[i].strokeColor = @strokeColor
		return

	addShader: ->
		if @shade is true
			for i of @shadeObjects
				shader.shadeObject.push @shadeObjects[i]
		return


# model -->

# object -->
DEFIINE_instanceNum = 2100
instanceObject = new Array()
objectInit = ->
	i = 0

	while i < DEFIINE_instanceNum
		instanceObject[i] = new isoscelesRightTriangle(
			shade: false
			fill: false
			stroke: false
			color:
				r: 0.0
				g: 0.0
				b: 0.0
				a: 0.0

			fillColor:
				r: 0.0
				g: 0.0
				b: 0.0
				a: 0.0

			strokeColor:
				r: 0.0
				g: 0.0
				b: 0.0
				a: 0.0

			size: 0
			position:
				x: 2000 * Math.random() - 1000
				y: 2000 * Math.random() - 1000
				z: 2000 * Math.random() - 1000

			rotate:
				x: 720 * Math.random() - 360
				y: 720 * Math.random() - 360
				z: 720 * Math.random() - 360
		)
		i++
	return

objectUpdate = ->
	i = 0

	while i < instanceObject.length
		if instanceObject[i]
			instanceObject[i].controll
				shade: controll.value[i].shade
				fill: controll.value[i].fill
				stroke: controll.value[i].stroke
				color: controll.value[i].color
				fillColor: controll.value[i].fillColor
				strokeColor: controll.value[i].strokeColor
				size: controll.value[i].size
				position: controll.value[i].position
				rotate: controll.value[i].rotate

			instanceObject[i].update()
			instanceObject[i].addShader()
		i++
	return


# object -->

# motion -->
freemap_disconnected = ->
	@returnData = new Array()
	i = 0

	while i < DEFIINE_instanceNum
		@returnData[i] =
			shade: false
			fill: false
			stroke: false
			fillColor:
				r: 1.0
				g: 1.0
				b: 1.0
				a: 1.0

			strokeColor:
				r: 1.0
				g: 1.0
				b: 1.0
				a: 1.0

			size: 0
			position:
				x: Math.random() * 1000 - 500
				y: Math.random() * 1000 - 500
				z: Math.random() * 1000 - 500

			rotate:
				x: Math.random() * 1000 - 500
				y: Math.random() * 1000 - 500
				z: Math.random() * 1000 - 500
		i++
	@returnData

freemap_random = ->
	@returnData = new Array()
	i = 0

	while i < DEFIINE_instanceNum
		@returnData[i] =
			shade: false
			fill: false
			stroke: false
			fillColor:
				r: 1.0
				g: 1.0
				b: 1.0
				a: 1.0

			strokeColor:
				r: 1.0
				g: 1.0
				b: 1.0
				a: 1.0

			size: Math.random() * 2
			position:
				x: Math.random() * 1500 - 750
				y: Math.random() * 1500 - 750
				z: Math.random() * 1500 - 750

			rotate:
				x: Math.random() * 720 - 360
				y: Math.random() * 720 - 360
				z: Math.random() * 720 - 360
		i++
	i = 0

	while i < 100
		@returnData[i].shade = true
		@returnData[i].fill = true
		i++
	@returnData

fontmap_fullchara = ->
	@returnData = new Array()
	@col = 130
	@row = 150
	@cellLength = 18
	@cellSpace = 18
	i = 0

	while i < DEFIINE_instanceNum
		@returnData[i] =
			shade: false
			fill: false
			stroke: false
			fillColor:
				r: 1.0
				g: 1.0
				b: 1.0
				a: 1.0

			strokeColor:
				r: 1.0
				g: 1.0
				b: 1.0
				a: 1.0

			size: 0
			position:
				x: 0
				y: 0
				z: 0

			rotate:
				x: 0
				y: 0
				z: 0
		i++
	@fontMapData = [
		{
			#A
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * -2
				y: @row * 3
				z: 0

			map: [
				[0,0,0,2,0]
				[0,0,2,5,0]
				[0,2,1,1,0]
				[0,1,3,5,0]
				[0,1,0,1,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#B
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * -1
				y: @row * 3
				z: 0

			map: [
				[0,4,0,0,0]
				[0,3,3,4,0]
				[0,5,3,1,0]
				[0,5,2,1,0]
				[0,3,1,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#C
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * 0
				y: @row * 3
				z: 0

			map: [
				[0,0,4,0,0]
				[0,2,1,4,0]
				[0,1,0,0,0]
				[0,3,4,1,0]
				[0,0,3,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#D
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * 1
				y: @row * 3
				z: 0

			map: [
				[0,4,0,0,0]
				[0,3,3,4,0]
				[0,5,0,5,0]
				[0,5,2,1,0]
				[0,1,1,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#E
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * 2
				y: @row * 3
				z: 0

			map: [
				[0,0,2,1,0]
				[0,2,1,0,0]
				[0,2,2,1,0]
				[0,5,0,2,0]
				[0,1,3,1,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#F
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * -2
				y: @row * 2
				z: 0

			map: [
				[0,0,2,1,0]
				[0,2,1,0,0]
				[0,2,2,1,0]
				[0,5,0,0,0]
				[0,1,0,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#G
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * -1
				y: @row * 2
				z: 0

			map: [
				[0,0,2,0,0]
				[0,2,1,0,0]
				[0,1,0,4,0]
				[0,3,2,1,0]
				[0,0,3,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#H
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * 0
				y: @row * 2
				z: 0

			map: [
				[0,4,0,2,0]
				[0,5,0,1,0]
				[0,2,1,5,0]
				[0,5,0,5,0]
				[0,1,0,3,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#I
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * 1
				y: @row * 2
				z: 0

			map: [
				[0,0,2,0,0]
				[0,0,2,0,0]
				[0,0,5,0,0]
				[0,0,5,0,0]
				[0,0,1,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#J
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * 2
				y: @row * 2
				z: 0

			map: [
				[0,0,0,2,0]
				[0,0,0,5,0]
				[0,0,0,5,0]
				[0,4,2,1,0]
				[0,0,1,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#K
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * -2
				y: @row * 1
				z: 0

			map: [
				[0,4,0,0,0]
				[0,4,0,2,0]
				[0,5,2,1,0]
				[0,5,0,4,0]
				[0,1,0,3,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#L
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * -1
				y: @row * 1
				z: 0

			map: [
				[0,4,0,0,0]
				[0,5,0,0,0]
				[0,5,0,0,0]
				[0,3,0,0,0]
				[0,0,3,4,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#M
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * 0
				y: @row * 1
				z: 0

			map: [
				[0,4,0,0,0]
				[0,5,4,4,0]
				[0,5,3,3,4]
				[0,3,0,0,3]
				[0,3,0,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#N
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * 1
				y: @row * 1
				z: 0

			map: [
				[0,0,0,4,0]
				[0,4,0,5,0]
				[0,5,4,4,0]
				[0,5,3,5,0]
				[0,1,0,3,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#O
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * 2
				y: @row * 1
				z: 0

			map: [
				[0,0,4,0,0]
				[0,2,1,4,0]
				[0,1,0,3,0]
				[0,3,4,1,0]
				[0,0,3,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#P
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * -2
				y: @row * 0
				z: 0

			map: [
				[0,4,0,0,0]
				[0,5,3,4,0]
				[0,3,4,1,0]
				[0,5,0,0,0]
				[0,1,0,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#Q
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * -1
				y: @row * 0
				z: 0

			map: [
				[0,0,4,0,0]
				[0,2,1,4,0]
				[0,1,2,3,0]
				[0,3,2,5,0]
				[0,0,3,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#R
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * 0
				y: @row * 0
				z: 0

			map: [
				[0,4,0,0,0]
				[0,5,3,4,0]
				[0,3,4,1,0]
				[0,5,0,4,0]
				[0,1,0,3,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#S
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * 1
				y: @row * 0
				z: 0

			map: [
				[0,0,0,4,0]
				[0,2,1,0,0]
				[0,0,3,4,0]
				[0,3,2,1,0]
				[0,0,1,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#T
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * 2
				y: @row * 0
				z: 0

			map: [
				[0,2,5,1,0]
				[0,0,5,0,0]
				[0,0,5,0,0]
				[0,0,2,0,0]
				[0,0,1,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#U
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * -2
				y: @row * -1
				z: 0

			map: [
				[0,0,0,4,0]
				[0,2,0,3,0]
				[0,5,0,5,0]
				[0,5,0,1,0]
				[0,3,1,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#V
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * -1
				y: @row * -1
				z: 0

			map: [
				[0,0,0,2,0]
				[0,0,0,5,0]
				[0,4,0,2,0]
				[0,3,4,1,0]
				[0,0,3,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#W
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * 0
				y: @row * -1
				z: 0

			map: [
				[0,2,0,0,0]
				[0,2,0,0,2]
				[0,5,2,2,1]
				[0,5,1,1,0]
				[0,1,0,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#X
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * 1
				y: @row * -1
				z: 0

			map: [
				[0,0,0,2,0]
				[0,4,0,1,0]
				[0,3,2,0,0]
				[0,2,1,4,0]
				[0,1,0,3,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#Y
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * 2
				y: @row * -1
				z: 0

			map: [
				[0,0,0,2,0]
				[0,4,0,1,0]
				[0,3,2,0,0]
				[0,0,5,0,0]
				[0,0,3,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#Z
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * -2
				y: @row * -2
				z: 0

			map: [
				[0,0,0,0,0]
				[0,2,5,1,0]
				[0,0,2,1,0]
				[0,2,1,0,0]
				[2,5,1,1,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#.
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * -1
				y: @row * -2
				z: 0

			map: [
				[0,0,0,0,0]
				[0,0,0,0,0]
				[0,0,0,0,0]
				[0,0,0,0,0]
				[0,5,0,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#,
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * -0
				y: @row * -2
				z: 0

			map: [
				[0,0,0,0,0]
				[0,0,0,0,0]
				[0,0,0,0,0]
				[0,0,0,0,0]
				[0,1,0,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#!
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * 1
				y: @row * -2
				z: 0

			map: [
				[0,0,2,0,0]
				[0,0,5,0,0]
				[0,0,5,0,0]
				[0,0,1,0,0]
				[0,0,1,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#?
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * 2
				y: @row * -2
				z: 0

			map: [
				[0,0,2,4,0]
				[0,0,0,2,0]
				[0,0,2,1,0]
				[0,0,1,0,0]
				[0,0,1,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#1
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * -2
				y: @row * -3
				z: 0

			map: [
				[0,0,2,0,0]
				[0,0,5,0,0]
				[0,0,5,0,0]
				[0,0,5,0,0]
				[0,0,3,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#2
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * -1
				y: @row * -3
				z: 0

			map: [
				[0,0,0,0,0]
				[0,0,3,4,0]
				[0,0,2,1,0]
				[0,2,1,0,0]
				[0,3,2,4,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#3
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * 0
				y: @row * -3
				z: 0

			map: [
				[0,0,0,0,0]
				[0,0,3,4,0]
				[0,0,2,1,0]
				[0,0,2,1,0]
				[0,2,1,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#4
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * 1
				y: @row * -3
				z: 0

			map: [
				[0,0,0,0,0]
				[0,0,2,1,0]
				[0,2,1,2,0]
				[0,3,2,5,0]
				[0,0,0,1,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#5
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * 2
				y: @row * -3
				z: 0

			map: [
				[0,0,0,0,0]
				[0,0,2,1,0]
				[0,2,4,0,0]
				[0,0,3,4,0]
				[0,0,2,1,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#6
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * -2
				y: @row * -4
				z: 0

			map: [
				[0,0,0,0,0]
				[0,2,1,0,0]
				[0,5,4,0,0]
				[0,3,0,4,0]
				[0,0,3,1,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#7
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * -1
				y: @row * -4
				z: 0

			map: [
				[0,0,0,0,0]
				[0,2,1,5,0]
				[0,0,2,1,0]
				[0,2,1,0,0]
				[0,1,0,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#8
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * 0
				y: @row * -4
				z: 0

			map: [
				[0,0,0,0,0]
				[0,0,2,4,0]
				[0,0,1,1,0]
				[0,2,3,4,0]
				[0,3,2,1,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#9
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * 1
				y: @row * -4
				z: 0

			map: [
				[0,0,0,0,0]
				[0,2,1,4,0]
				[0,3,2,1,0]
				[0,2,1,0,0]
				[0,1,0,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#0
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * 2
				y: @row * -4
				z: 0

			map: [
				[0,0,0,0,0]
				[0,0,2,4,0]
				[0,2,1,2,0]
				[0,1,2,1,0]
				[0,3,1,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
	]
	lastMap = 0
	i = 0

	while i < @fontMapData.length
		j = 0

		while j < @fontMapData[i].map.length
			k = 0

			while k < @fontMapData[i].map[j].length
				switch @fontMapData[i].map[j][k]
					when 0
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].shade = false
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].fill = false
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].stroke = false
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].size = 0
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].position =
							x: 0
							y: 0
							z: 0

						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].rotate =
							x: 0
							y: 0
							z: 0
					when 1
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].shade = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].fill = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].stroke = false
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].size = @fontMapData[i].cellLength / 2
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].position =
							x: (parseInt(k) * @fontMapData[i].cellSpace - @fontMapData[i].map[j].length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.x
							y: (-parseInt(j) * @fontMapData[i].cellSpace - -@fontMapData[i].map.length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.y
							z: @fontMapData[i].center.z

						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].rotate =
							x: 0
							y: 0
							z: 180
					when 2
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].shade = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].fill = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].stroke = false
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].size = @fontMapData[i].cellLength / 2
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].position =
							x: (parseInt(k) * @fontMapData[i].cellSpace - @fontMapData[i].map[j].length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.x
							y: (-parseInt(j) * @fontMapData[i].cellSpace - -@fontMapData[i].map.length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.y
							z: @fontMapData[i].center.z

						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].rotate =
							x: 0
							y: 0
							z: 0
					when 3
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].shade = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].fill = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].stroke = false
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].size = @fontMapData[i].cellLength / 2
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].position =
							x: (parseInt(k) * @fontMapData[i].cellSpace - @fontMapData[i].map[j].length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.x
							y: (-parseInt(j) * @fontMapData[i].cellSpace - -@fontMapData[i].map.length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.y
							z: @fontMapData[i].center.z

						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].rotate =
							x: 0
							y: 0
							z: 90
					when 4
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].shade = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].fill = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].stroke = false
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].size = @fontMapData[i].cellLength / 2
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].position =
							x: (parseInt(k) * @fontMapData[i].cellSpace - @fontMapData[i].map[j].length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.x
							y: (-parseInt(j) * @fontMapData[i].cellSpace - -@fontMapData[i].map.length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.y
							z: @fontMapData[i].center.z

						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].rotate =
							x: 0
							y: 0
							z: 270
					when 5
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].shade = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].fill = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].stroke = false
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].size = @fontMapData[i].cellLength / 2
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].position =
							x: (parseInt(k) * @fontMapData[i].cellSpace - @fontMapData[i].map[j].length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.x
							y: (-parseInt(j) * @fontMapData[i].cellSpace - -@fontMapData[i].map.length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.y
							z: @fontMapData[i].center.z

						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].rotate =
							x: 0
							y: 0
							z: 180

						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].shade = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].fill = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].stroke = false
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].size = @fontMapData[i].cellLength / 2
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].position =
							x: (parseInt(k) * @fontMapData[i].cellSpace - @fontMapData[i].map[j].length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.x
							y: (-parseInt(j) * @fontMapData[i].cellSpace - -@fontMapData[i].map.length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.y
							z: @fontMapData[i].center.z

						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].rotate =
							x: 0
							y: 0
							z: 0
				k++
			j++
		lastMap += @fontMapData[i].mapDataNum
		i++
	@returnData

fontmap_solidcell = ->
	@returnData = new Array()
	@col = 80
	@row = 160
	@cellLength = 22
	@cellSpace = 22
	i = 0

	while i < DEFIINE_instanceNum
		@returnData[i] =
			shade: false
			fill: false
			stroke: false
			fillColor:
				r: 1.0
				g: 1.0
				b: 1.0
				a: 1.0

			strokeColor:
				r: 1.0
				g: 1.0
				b: 1.0
				a: 1.0

			size: 0
			position:
				x: 0
				y: 0
				z: 0

			rotate:
				x: 0
				y: 0
				z: 0
		i++
	@fontMapData = [
		{
			#S
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * -3.5
				y: @row * 0.15
				z: 0

			map: [
				[0,0,0,4,0]
				[0,2,1,0,0]
				[0,0,3,4,0]
				[0,3,2,1,0]
				[0,0,1,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#O
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * -2.5
				y: @row * 0.15
				z: 0

			map: [
				[0,0,4,0,0]
				[0,2,1,4,0]
				[0,1,0,3,0]
				[0,3,4,1,0]
				[0,0,3,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#L
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * -1.5
				y: @row * 0.15
				z: 0

			map: [
				[0,4,0,0,0]
				[0,5,0,0,0]
				[0,5,0,0,0]
				[0,3,0,0,0]
				[0,0,3,4,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#I
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * -0.8
				y: @row * 0.15
				z: 0

			map: [
				[0,0,2,0,0]
				[0,0,2,0,0]
				[0,0,5,0,0]
				[0,0,5,0,0]
				[0,0,1,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#D
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * 0
				y: @row * 0.15
				z: 0

			map: [
				[0,4,0,0,0]
				[0,3,3,4,0]
				[0,5,0,5,0]
				[0,5,2,1,0]
				[0,1,1,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#C
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * 1
				y: @row * -0.15
				z: 0

			map: [
				[0,0,4,0,0]
				[0,2,1,4,0]
				[0,1,0,0,0]
				[0,3,4,1,0]
				[0,0,3,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#E
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * 2
				y: @row * -0.15
				z: 0

			map: [
				[0,0,2,1,0]
				[0,2,1,0,0]
				[0,2,2,1,0]
				[0,5,0,2,0]
				[0,1,3,1,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#L
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * 3
				y: @row * -0.15
				z: 0

			map: [
				[0,4,0,0,0]
				[0,5,0,0,0]
				[0,5,0,0,0]
				[0,3,0,0,0]
				[0,0,3,4,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#L
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * 3.6
				y: @row * -0.15
				z: 0

			map: [
				[0,4,0,0,0]
				[0,5,0,0,0]
				[0,5,0,0,0]
				[0,3,0,0,0]
				[0,0,3,4,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
	]
	lastMap = 0
	i = 0

	while i < @fontMapData.length
		j = 0

		while j < @fontMapData[i].map.length
			k = 0

			while k < @fontMapData[i].map[j].length
				switch @fontMapData[i].map[j][k]
					when 0
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].shade = false
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].fill = false
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].stroke = false
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].size = 0
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].position =
							x: 0
							y: 0
							z: 0

						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].rotate =
							x: 0
							y: 0
							z: 0
					when 1
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].shade = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].fill = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].stroke = false
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].size = @fontMapData[i].cellLength / 2
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].position =
							x: (parseInt(k) * @fontMapData[i].cellSpace - @fontMapData[i].map[j].length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.x
							y: (-parseInt(j) * @fontMapData[i].cellSpace - -@fontMapData[i].map.length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.y
							z: @fontMapData[i].center.z

						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].rotate =
							x: 0
							y: 0
							z: 180
					when 2
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].shade = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].fill = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].stroke = false
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].size = @fontMapData[i].cellLength / 2
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].position =
							x: (parseInt(k) * @fontMapData[i].cellSpace - @fontMapData[i].map[j].length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.x
							y: (-parseInt(j) * @fontMapData[i].cellSpace - -@fontMapData[i].map.length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.y
							z: @fontMapData[i].center.z

						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].rotate =
							x: 0
							y: 0
							z: 0
					when 3
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].shade = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].fill = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].stroke = false
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].size = @fontMapData[i].cellLength / 2
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].position =
							x: (parseInt(k) * @fontMapData[i].cellSpace - @fontMapData[i].map[j].length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.x
							y: (-parseInt(j) * @fontMapData[i].cellSpace - -@fontMapData[i].map.length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.y
							z: @fontMapData[i].center.z

						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].rotate =
							x: 0
							y: 0
							z: 90
					when 4
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].shade = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].fill = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].stroke = false
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].size = @fontMapData[i].cellLength / 2
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].position =
							x: (parseInt(k) * @fontMapData[i].cellSpace - @fontMapData[i].map[j].length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.x
							y: (-parseInt(j) * @fontMapData[i].cellSpace - -@fontMapData[i].map.length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.y
							z: @fontMapData[i].center.z

						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].rotate =
							x: 0
							y: 0
							z: 270
					when 5
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].shade = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].fill = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].stroke = false
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].size = @fontMapData[i].cellLength / 2
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].position =
							x: (parseInt(k) * @fontMapData[i].cellSpace - @fontMapData[i].map[j].length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.x
							y: (-parseInt(j) * @fontMapData[i].cellSpace - -@fontMapData[i].map.length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.y
							z: @fontMapData[i].center.z

						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].rotate =
							x: 0
							y: 0
							z: 180

						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].shade = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].fill = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].stroke = false
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].size = @fontMapData[i].cellLength / 2
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].position =
							x: (parseInt(k) * @fontMapData[i].cellSpace - @fontMapData[i].map[j].length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.x
							y: (-parseInt(j) * @fontMapData[i].cellSpace - -@fontMapData[i].map.length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.y
							z: @fontMapData[i].center.z

						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].rotate =
							x: 0
							y: 0
							z: 0
				k++
			j++
		lastMap += @fontMapData[i].mapDataNum
		i++
	@returnData

fontmap_hackyou = ->
	@returnData = new Array()
	@col = 80
	@row = 160
	@cellLength = 22
	@cellSpace = 22
	i = 0

	while i < DEFIINE_instanceNum
		@returnData[i] =
			shade: false
			fill: false
			stroke: false
			fillColor:
				r: 1.0
				g: 1.0
				b: 1.0
				a: 1.0

			strokeColor:
				r: 1.0
				g: 1.0
				b: 1.0
				a: 1.0

			size: 0
			position:
				x: 0
				y: 0
				z: 0

			rotate:
				x: 0
				y: 0
				z: 0
		i++
	@fontMapData = [
		{
			#H
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * -3.5
				y: @row * 0
				z: 0

			map: [
				[0,4,0,2,0]
				[0,5,0,1,0]
				[0,2,1,5,0]
				[0,5,0,5,0]
				[0,1,0,3,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#A
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * -2.5
				y: @row * 0
				z: 0

			map: [
				[0,0,0,2,0]
				[0,0,2,5,0]
				[0,2,1,1,0]
				[0,1,3,5,0]
				[0,1,0,1,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#C
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * -1.5
				y: @row * 0
				z: 0

			map: [
				[0,0,4,0,0]
				[0,2,1,4,0]
				[0,1,0,0,0]
				[0,3,4,1,0]
				[0,0,3,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#K
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * -0.5
				y: @row * 0
				z: 0

			map: [
				[0,4,0,0,0]
				[0,4,0,2,0]
				[0,5,2,1,0]
				[0,5,0,4,0]
				[0,1,0,3,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#Y
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * 1.0
				y: @row * 0
				z: 0

			map: [
				[0,0,0,2,0]
				[0,4,0,1,0]
				[0,3,2,0,0]
				[0,0,5,0,0]
				[0,0,3,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#O
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * 2.0
				y: @row * 0
				z: 0

			map: [
				[0,0,4,0,0]
				[0,2,1,4,0]
				[0,1,0,3,0]
				[0,3,4,1,0]
				[0,0,3,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
		{
			#U
			cellLength: @cellLength
			cellSpace: @cellSpace
			center:
				x: @col * 3.0
				y: @row * 0
				z: 0

			map: [
				[0,0,0,4,0]
				[0,2,0,3,0]
				[0,5,0,5,0]
				[0,5,0,1,0]
				[0,3,1,0,0]
			]
			mapDataNum: 5 * 5 * 2
			colUnit: 5 * 2
		}
	]
	lastMap = 0
	i = 0

	while i < @fontMapData.length
		j = 0

		while j < @fontMapData[i].map.length
			k = 0

			while k < @fontMapData[i].map[j].length
				switch @fontMapData[i].map[j][k]
					when 0
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].shade = false
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].fill = false
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].stroke = false
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].size = 0
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].position =
							x: 0
							y: 0
							z: 0

						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].rotate =
							x: 0
							y: 0
							z: 0
					when 1
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].shade = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].fill = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].stroke = false
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].size = @fontMapData[i].cellLength / 2
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].position =
							x: (parseInt(k) * @fontMapData[i].cellSpace - @fontMapData[i].map[j].length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.x
							y: (-parseInt(j) * @fontMapData[i].cellSpace - -@fontMapData[i].map.length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.y
							z: @fontMapData[i].center.z

						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].rotate =
							x: 0
							y: 0
							z: 180
					when 2
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].shade = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].fill = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].stroke = false
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].size = @fontMapData[i].cellLength / 2
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].position =
							x: (parseInt(k) * @fontMapData[i].cellSpace - @fontMapData[i].map[j].length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.x
							y: (-parseInt(j) * @fontMapData[i].cellSpace - -@fontMapData[i].map.length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.y
							z: @fontMapData[i].center.z

						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].rotate =
							x: 0
							y: 0
							z: 0
					when 3
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].shade = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].fill = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].stroke = false
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].size = @fontMapData[i].cellLength / 2
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].position =
							x: (parseInt(k) * @fontMapData[i].cellSpace - @fontMapData[i].map[j].length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.x
							y: (-parseInt(j) * @fontMapData[i].cellSpace - -@fontMapData[i].map.length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.y
							z: @fontMapData[i].center.z

						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].rotate =
							x: 0
							y: 0
							z: 90
					when 4
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].shade = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].fill = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].stroke = false
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].size = @fontMapData[i].cellLength / 2
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].position =
							x: (parseInt(k) * @fontMapData[i].cellSpace - @fontMapData[i].map[j].length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.x
							y: (-parseInt(j) * @fontMapData[i].cellSpace - -@fontMapData[i].map.length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.y
							z: @fontMapData[i].center.z

						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].rotate =
							x: 0
							y: 0
							z: 270
					when 5
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].shade = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].fill = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].stroke = false
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].size = @fontMapData[i].cellLength / 2
						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].position =
							x: (parseInt(k) * @fontMapData[i].cellSpace - @fontMapData[i].map[j].length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.x
							y: (-parseInt(j) * @fontMapData[i].cellSpace - -@fontMapData[i].map.length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.y
							z: @fontMapData[i].center.z

						@returnData[j * @fontMapData[i].colUnit + k * 2 + lastMap].rotate =
							x: 0
							y: 0
							z: 180

						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].shade = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].fill = true
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].stroke = false
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].size = @fontMapData[i].cellLength / 2
						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].position =
							x: (parseInt(k) * @fontMapData[i].cellSpace - @fontMapData[i].map[j].length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.x
							y: (-parseInt(j) * @fontMapData[i].cellSpace - -@fontMapData[i].map.length * @fontMapData[i].cellSpace / 2) + @fontMapData[i].center.y
							z: @fontMapData[i].center.z

						@returnData[j * @fontMapData[i].colUnit + k * 2 + 1 + lastMap].rotate =
							x: 0
							y: 0
							z: 0
				k++
			j++
		lastMap += @fontMapData[i].mapDataNum
		i++
	@returnData

dynamic_001 = # bold motion
	value: new Array()
	uniqueValue: {}
	uniqueCloseValue: new closeValue(50, 500)
	init: ->
		i = 0

		while i < DEFIINE_instanceNum
			dynamic_001.value[i] =
				shade: null
				fill: null
				stroke: null
				size: null
				position: null
				rotate: null
			i++
		return

	iteration: ->
		i = 0

		while i < DEFIINE_instanceNum
			dynamic_001.value[i].size = 30 * Math.random()
			i++
		dynamic_001.value

dynamic_001.init()
dynamic_002 = # light motion
	value: new Array()
	uniqueValue: {}
	uniqueCloseValue: new closeValue(50, 500)
	init: ->
		i = 0

		while i < DEFIINE_instanceNum
			dynamic_002.value[i] =
				shade: null
				fill: null
				stroke: null
				size: null
				position: null
				rotate: null
			i++
		return

	iteration: ->
		i = 0

		while i < DEFIINE_instanceNum
			dynamic_002.value[i].size = Math.random() * 8
			i++
		dynamic_002.value

dynamic_002.init()
dynamic_003 = # sphere motion
	value: new Array()
	uniqueValue:
		masterDegree:
			theta: 0
			phi: 0

		masterControllDegree:
			theta: 0
			phi: 0

		masterRadius: 0
		masterControllRadius: 200
		cellDegree: new Array()

	uniqueCloseValue: new closeValue(50, 500)
	init: ->
		dynamic_003.masterControllRadius = Math.random() * 200 + 100
		dynamic_003.masterControllDegree =
			theta: 0
			phi: Math.random() * 10 - 5

		i = 0

		while i < DEFIINE_instanceNum
			dynamic_003.value[i] =
				shade: null
				fill: null
				stroke: null
				size: null
				position: null
				rotate: null

			dynamic_003.uniqueValue.cellDegree[i] =
				theta: 360 * Math.random()
				phi: 360 * Math.random()
			i++
		return

	randomInit: ->
		dynamic_003.masterControllRadius = Math.random() * 150 + 150
		dynamic_003.masterControllDegree =
			theta: 0
			phi: Math.random() * 20 - 10

		i = 0

		while i < DEFIINE_instanceNum
			dynamic_003.uniqueValue.cellDegree[i] =
				theta: 360 * Math.random()
				phi: 360 * Math.random()
			i++
		return

	iteration: ->
		dynamic_003.randomInit()  if Math.random() < 0.03
		dynamic_003.uniqueValue.masterRadius = dynamic_003.masterControllRadius + 50 * Math.random()
		dynamic_003.uniqueValue.masterDegree.phi += dynamic_003.masterControllDegree.phi
		i = 0

		while i < DEFIINE_instanceNum
			ra = polarToRectangle(dynamic_003.uniqueValue.cellDegree[i].theta + dynamic_003.uniqueValue.masterDegree.theta, dynamic_003.uniqueValue.cellDegree[i].phi + dynamic_003.uniqueValue.masterDegree.phi, dynamic_003.uniqueValue.masterRadius)
			dynamic_003.value[i].position =
				x: ra.x
				y: ra.y
				z: ra.z

			dynamic_003.value[i].size = Math.random() * 5
			i++
		dynamic_003.value

dynamic_003.init()
dynamic_004 = # rotate motion
	value: new Array()
	uniqueValue:
		closeValue: new Array()

	uniqueCloseValue: new closeValue(50, 500)
	init: ->
		i = 0

		while i < DEFIINE_instanceNum
			dynamic_004.uniqueValue.closeValue[i] = new Object()
			dynamic_004.uniqueValue.closeValue[i].x = new closeValue(200, 500)
			dynamic_004.uniqueValue.closeValue[i].y = new closeValue(200, 500)
			dynamic_004.uniqueValue.closeValue[i].z = new closeValue(200, 500)
			dynamic_004.value[i] =
				shade: null
				fill: null
				stroke: null
				size: null
				position: null
				rotate:
					x: 0
					y: 0
					z: 0
			i++
		return

	iteration: ->
		i = 0

		while i < DEFIINE_instanceNum
			dynamic_004.value[i].rotate.x = dynamic_004.uniqueValue.closeValue[0].x.execution() * 720
			dynamic_004.value[i].rotate.y = dynamic_004.uniqueValue.closeValue[0].y.execution() * 720
			dynamic_004.value[i].rotate.z = dynamic_004.uniqueValue.closeValue[0].z.execution() * 720
			dynamic_004.value[i].size = 5
			i++
		dynamic_004.value

dynamic_004.init()

# motion -->

# effects -->
backgroundController =
	color: new String
	init: ->
		backgroundController.color = "rgba(0, 0, 0, 1)"
		return

	draw: ->
		init.ctx.fillStyle = backgroundController.color
		init.ctx.fillRect 0, 0, init.size.x, init.size.y
		return

backgroundController.init()
nodeStroke =
	vertsArray: new Array()
	color: new String()
	init: ->
		nodeStroke.color =
			r: 1.0
			g: 1.0
			b: 1.0
			a: 0.15

		return

	iteration: ->
		nodeStroke.vertsArray = []
		if shader.chromaticAberration.flag is false
			init.ctx.globalCompositeOperation = "source-over"
			i = 0

			while i < shader.shadeObject.length
				j = 0

				while j < shader.shadeObject[i].face.verts.length
					nodeStroke.vertsArray.push shader.shadeObject[i].face.verts[j].affineOut
					j++
				i++
			init.ctx.beginPath()
			i = 0

			while i < nodeStroke.vertsArray.length
				init.ctx.lineTo nodeStroke.vertsArray[i].x, nodeStroke.vertsArray[i].y  if Math.random() > 0.75
				i++
			init.ctx.closePath()
			init.ctx.strokeStyle = "rgba(" + nodeStroke.color.r * 255 + "," + nodeStroke.color.g * 255 + "," + nodeStroke.color.b * 255 + "," + nodeStroke.color.a + ")"
			init.ctx.stroke()
		else
			init.ctx.globalCompositeOperation = "lighter"
			init.ctx.translate shader.chromaticAberration.r.x, shader.chromaticAberration.r.y
			i = 0

			while i < shader.shadeObject.length
				j = 0

				while j < shader.shadeObject[i].face.verts.length
					nodeStroke.vertsArray.push shader.shadeObject[i].face.verts[j].affineOut
					j++
				i++
			init.ctx.beginPath()
			i = 0

			while i < nodeStroke.vertsArray.length
				init.ctx.lineTo nodeStroke.vertsArray[i].x, nodeStroke.vertsArray[i].y
				i++
			init.ctx.closePath()
			init.ctx.strokeStyle = "rgba(" + nodeStroke.color.r * 255 + "," + 0 + "," + 0 + "," + nodeStroke.color.a / 1 + ")"
			init.ctx.stroke()
			init.ctx.translate -shader.chromaticAberration.r.x, -shader.chromaticAberration.r.y
			init.ctx.translate shader.chromaticAberration.g.x, shader.chromaticAberration.g.y
			i = 0

			while i < shader.shadeObject.length
				j = 0

				while j < shader.shadeObject[i].face.verts.length
					nodeStroke.vertsArray.push shader.shadeObject[i].face.verts[j].affineOut
					j++
				i++
			init.ctx.beginPath()
			i = 0

			while i < nodeStroke.vertsArray.length
				init.ctx.lineTo nodeStroke.vertsArray[i].x, nodeStroke.vertsArray[i].y
				i++
			init.ctx.closePath()
			init.ctx.strokeStyle = "rgba(" + 0 + "," + nodeStroke.color.g * 255 + "," + 0 + "," + nodeStroke.color.a / 1.5 + ")"
			init.ctx.stroke()
			init.ctx.translate -shader.chromaticAberration.g.x, -shader.chromaticAberration.g.y
			init.ctx.translate shader.chromaticAberration.b.x, shader.chromaticAberration.b.y
			i = 0

			while i < shader.shadeObject.length
				j = 0

				while j < shader.shadeObject[i].face.verts.length
					nodeStroke.vertsArray.push shader.shadeObject[i].face.verts[j].affineOut
					j++
				i++
			init.ctx.beginPath()
			i = 0

			while i < nodeStroke.vertsArray.length
				init.ctx.lineTo nodeStroke.vertsArray[i].x, nodeStroke.vertsArray[i].y
				i++
			init.ctx.closePath()
			init.ctx.strokeStyle = "rgba(" + 0 + "," + 0 + "," + nodeStroke.color.b * 255 + "," + nodeStroke.color.a / 2 + ")"
			init.ctx.stroke()
			init.ctx.translate -shader.chromaticAberration.b.x, -shader.chromaticAberration.b.y
		return

nodeStroke.init()
invertController =
	flag: false
	iteration: ->
		if invertController.flag is true
			light.enableLight = false
			backgroundController.color = "rgba(255,255,255,1)"
			nodeStroke.color.r = 0.0
			nodeStroke.color.g = 0.0
			nodeStroke.color.b = 0.0
			i = 0

			while i < DEFIINE_instanceNum
				instanceObject[i].fillColor.r = 1.0 - instanceObject[i].fillColor.r
				instanceObject[i].fillColor.g = 1.0 - instanceObject[i].fillColor.g
				instanceObject[i].fillColor.b = 1.0 - instanceObject[i].fillColor.b
				i++
		else
			nodeStroke.color.r = 1.0
			nodeStroke.color.g = 1.0
			nodeStroke.color.b = 1.0
			light.enableLight = true
			backgroundController.color = "rgba(0,0,0,1)"
		return

effectCv = new closeValue(300, 500)
effectTimer = ->
	effectVal = effectCv.execution()
	if effectVal > 0.7
		shader.chromaticAberration.flag = true
		shader.chromaticAberration.r.x = (effectVal - 0.75) * 4 * 15
		shader.chromaticAberration.g.x = (effectVal - 0.75) * 4 * 0
		shader.chromaticAberration.b.x = (effectVal - 0.75) * 4 * -15
	else if effectVal < 0.2
		invertController.flag = true
	else
		invertController.flag = false
		shader.chromaticAberration.flag = false
	return

mousePosX = 0
mousePosY = 0
document.body.onmousemove = (e) ->
	mousePosX = (e.pageX - init.size.x) / init.size.x * 30
	mousePosY = (e.pageY - init.size.y) / init.size.y * 30
	return

zoomCv = new closeValue(300, 1000)
randomSelfCv = new closeValue(300, 400)
rotateCv = new closeValue(300, 500)
memRotateX = Math.random() * 100
memRotateY = Math.random() * 100
rotateCv.smoothFlag = false
cameraTimer = ->
	zoomVal = zoomCv.execution()
	if zoomVal > 0.8
		camera.zoom = 1.5
	else if zoomVal < 0.2
		camera.zoom = 2.2
	else
		camera.zoom = 1
	randomSelfVal = randomSelfCv.execution()
	if randomSelfCv > 0.8
		camera.self.x = Math.random() * 10 - 5
		camera.self.y = Math.random() * 10 - 5
		camera.self.z = Math.random() * 10 - 5
	memRotateX += 8
	memRotateY += 14
	rotateVal = rotateCv.execution()
	if rotateVal > 0.8
		camera.rotate.x = memRotateX
		camera.rotate.y = memRotateY
	else
		camera.rotate.x = 0
		camera.rotate.y = 0
	return


# effects -->

# controller -->
controll =
	value: new Array()
	startValue: new Array()
	endValue: new Array()
	startFlag: new Array()
	startTime: new Array()
	durationTime: new Array()
	progress: new Array()
	processArray: new Array()
	staticFlag: 0
	staticMap:
		freemap_disconnected: freemap_disconnected()
		freemap_random: freemap_random()
		fontMap_fullchara: fontmap_fullchara()
		fontmap_solidcell: fontmap_solidcell()
		fontmap_hackyou: fontmap_hackyou()

	dynamicFlag: 0
	dynamicMap: new Object
	init: ->
		i = 0

		while i < DEFIINE_instanceNum
			controll.value[i] =
				shade: false
				fill: false
				stroke: false
				fillColor:
					r: 0
					g: 0
					b: 0
					a: 0

				strokeColor:
					r: 0
					g: 0
					b: 0
					a: 0

				size: 0
				position:
					x: Math.random() * 1000 - 500
					y: Math.random() * 1000 - 500
					z: Math.random() * 1000 - 500

				rotate:
					x: Math.random() * 1000 - 500
					y: Math.random() * 1000 - 500
					z: Math.random() * 1000 - 500

			controll.startValue[i] = new Object()
			controll.endValue[i] = new Object()
			controll.startFlag[i] = false
			controll.startTime[i] = 0
			controll.progress[i] = 0
			controll.processArray[i] = null
			i++
		return

	startTransform: (num, durationTime) ->
		controll.startFlag[num] = true
		controll.durationTime[num] = durationTime
		controll.processArray[num] = controll.staticIteration
		return

	staticIteration: (num) -> # staticIteration
		switch controll.staticFlag
			when "freemap_disconnected"
				controll.endValue[num] = controll.staticMap.freemap_disconnected[num]
			when "freemap_random"
				controll.endValue[num] = controll.staticMap.freemap_random[num]
			when "fontmap_fullchara"
				controll.endValue[num] = controll.staticMap.fontMap_fullchara[num]
			when "fontmap_solidcell"
				controll.endValue[num] = controll.staticMap.fontmap_solidcell[num]
			when "fontmap_hackyou"
				controll.endValue[num] = controll.staticMap.fontmap_hackyou[num]
		switch controll.endValue[num].shade
			when true
				if controll.startFlag[num] is true
					controll.startFlag[num] = false
					controll.startTime[num] = Date.now()
					controll.startValue[num] = controll.value[num]
					controll.value[num].shade = controll.endValue[num].shade
					controll.value[num].fill = controll.endValue[num].fill
					controll.value[num].stroke = controll.endValue[num].stroke
				controll.progress[num] = Math.min(1, (Date.now() - controll.startTime[num]) / controll.durationTime[num])
				if controll.endValue[num].fillColor?
					controll.value[num].fillColor.r = controll.startValue[num].fillColor.r + (controll.endValue[num].fillColor.r - controll.startValue[num].fillColor.r) * controll.progress[num]
					controll.value[num].fillColor.g = controll.startValue[num].fillColor.g + (controll.endValue[num].fillColor.g - controll.startValue[num].fillColor.g) * controll.progress[num]
					controll.value[num].fillColor.b = controll.startValue[num].fillColor.b + (controll.endValue[num].fillColor.b - controll.startValue[num].fillColor.b) * controll.progress[num]
					controll.value[num].fillColor.a = controll.startValue[num].fillColor.a + (controll.endValue[num].fillColor.a - controll.startValue[num].fillColor.a) * controll.progress[num]
				if controll.endValue[num].strokeColor?
					controll.value[num].strokeColor.r = controll.startValue[num].strokeColor.r + (controll.endValue[num].strokeColor.r - controll.startValue[num].strokeColor.r) * controll.progress[num]
					controll.value[num].strokeColor.g = controll.startValue[num].strokeColor.g + (controll.endValue[num].strokeColor.g - controll.startValue[num].strokeColor.g) * controll.progress[num]
					controll.value[num].strokeColor.b = controll.startValue[num].strokeColor.b + (controll.endValue[num].strokeColor.b - controll.startValue[num].strokeColor.b) * controll.progress[num]
					controll.value[num].strokeColor.a = controll.startValue[num].strokeColor.a + (controll.endValue[num].strokeColor.a - controll.startValue[num].strokeColor.a) * controll.progress[num]
				controll.value[num].size = controll.startValue[num].size + (controll.endValue[num].size - controll.startValue[num].size) * controll.progress[num]  if controll.endValue[num].size
				if controll.endValue[num].position
					controll.value[num].position.x = controll.startValue[num].position.x + (controll.endValue[num].position.x - controll.startValue[num].position.x) * controll.progress[num]
					controll.value[num].position.y = controll.startValue[num].position.y + (controll.endValue[num].position.y - controll.startValue[num].position.y) * controll.progress[num]
					controll.value[num].position.z = controll.startValue[num].position.z + (controll.endValue[num].position.z - controll.startValue[num].position.z) * controll.progress[num]
				if controll.endValue[num].rotate
					controll.value[num].rotate.x = controll.startValue[num].rotate.x + (controll.endValue[num].rotate.x - controll.startValue[num].rotate.x) * controll.progress[num]
					controll.value[num].rotate.y = controll.startValue[num].rotate.y + (controll.endValue[num].rotate.y - controll.startValue[num].rotate.y) * controll.progress[num]
					controll.value[num].rotate.z = controll.startValue[num].rotate.z + (controll.endValue[num].rotate.z - controll.startValue[num].rotate.z) * controll.progress[num]
				controll.processArray[num] = null  if controll.progress[num] is 1
			when false
				if controll.startFlag[num] is true
					controll.startFlag[num] = false
					controll.startTime[num] = Date.now()
					controll.startValue[num] = controll.value[num]
				controll.progress[num] = Math.min(1, (Date.now() - controll.startTime[num]) / controll.durationTime[num])
				if controll.endValue[num].fillColor?
					controll.value[num].fillColor.r = controll.startValue[num].fillColor.r + (controll.endValue[num].fillColor.r - controll.startValue[num].fillColor.r) * controll.progress[num]
					controll.value[num].fillColor.g = controll.startValue[num].fillColor.g + (controll.endValue[num].fillColor.g - controll.startValue[num].fillColor.g) * controll.progress[num]
					controll.value[num].fillColor.b = controll.startValue[num].fillColor.b + (controll.endValue[num].fillColor.b - controll.startValue[num].fillColor.b) * controll.progress[num]
					controll.value[num].fillColor.a = controll.startValue[num].fillColor.a + (controll.endValue[num].fillColor.a - controll.startValue[num].fillColor.a) * controll.progress[num]
				if controll.endValue[num].strokeColor?
					controll.value[num].strokeColor.r = controll.startValue[num].strokeColor.r + (controll.endValue[num].strokeColor.r - controll.startValue[num].strokeColor.r) * controll.progress[num]
					controll.value[num].strokeColor.g = controll.startValue[num].strokeColor.g + (controll.endValue[num].strokeColor.g - controll.startValue[num].strokeColor.g) * controll.progress[num]
					controll.value[num].strokeColor.b = controll.startValue[num].strokeColor.b + (controll.endValue[num].strokeColor.b - controll.startValue[num].strokeColor.b) * controll.progress[num]
					controll.value[num].strokeColor.a = controll.startValue[num].strokeColor.a + (controll.endValue[num].strokeColor.a - controll.startValue[num].strokeColor.a) * controll.progress[num]
				controll.value[num].size = controll.startValue[num].size + (controll.endValue[num].size - controll.startValue[num].size) * controll.progress[num]  if controll.endValue[num].size?
				if controll.endValue[num].position?
					controll.value[num].position.x = controll.startValue[num].position.x + (controll.endValue[num].position.x - controll.startValue[num].position.x) * controll.progress[num]
					controll.value[num].position.y = controll.startValue[num].position.y + (controll.endValue[num].position.y - controll.startValue[num].position.y) * controll.progress[num]
					controll.value[num].position.z = controll.startValue[num].position.z + (controll.endValue[num].position.z - controll.startValue[num].position.z) * controll.progress[num]
				if controll.endValue[num].rotate?
					controll.value[num].rotate.x = controll.startValue[num].rotate.x + (controll.endValue[num].rotate.x - controll.startValue[num].rotate.x) * controll.progress[num]
					controll.value[num].rotate.y = controll.startValue[num].rotate.y + (controll.endValue[num].rotate.y - controll.startValue[num].rotate.y) * controll.progress[num]
					controll.value[num].rotate.z = controll.startValue[num].rotate.z + (controll.endValue[num].rotate.z - controll.startValue[num].rotate.z) * controll.progress[num]
				if controll.progress[num] is 1
					controll.value[num].fill = controll.endValue[num].fill
					controll.value[num].stroke = controll.endValue[num].stroke
					controll.value[num].shade = controll.endValue[num].shade
					controll.processArray[num] = null
		return

	dynamicTimer: ->
		switch controll.dynamicFlag
			when 0
				controll.dynamicMap = null
			when 1
				controll.dynamicMap = dynamic_001.iteration()
			when 2
				controll.dynamicMap = dynamic_002.iteration()
			when 3
				controll.dynamicMap = dynamic_003.iteration()
			when 4
				controll.dynamicMap = dynamic_004.iteration()
		if controll.dynamicMap?
			i = 0

			while i < DEFIINE_instanceNum
				
				#boolean
				controll.value[i].shade = controll.dynamicMap[i].shade  if controll.dynamicMap[i].shade?
				controll.value[i].fill = controll.dynamicMap[i].fill  if controll.dynamicMap[i].fill?
				controll.value[i].stroke = controll.dynamicMap[i].stroke  if controll.dynamicMap[i].stroke?
				
				#number
				if controll.dynamicMap[i].fillColor?
					controll.value[i].fillColor.r = controll.value[i].fillColor.r + (controll.dynamicMap[i].fillColor.r - controll.value[i].fillColor.r) / 4  if controll.dynamicMap[i].fillColor.r?
					controll.value[i].fillColor.g = controll.value[i].fillColor.g + (controll.dynamicMap[i].fillColor.g - controll.value[i].fillColor.g) / 4  if controll.dynamicMap[i].fillColor.g?
					controll.value[i].fillColor.b = controll.value[i].fillColor.b + (controll.dynamicMap[i].fillColor.b - controll.value[i].fillColor.b) / 4  if controll.dynamicMap[i].fillColor.b?
					controll.value[i].fillColor.a = controll.value[i].fillColor.a + (controll.dynamicMap[i].fillColor.a - controll.value[i].fillColor.a) / 4  if controll.dynamicMap[i].fillColor.a?
				if controll.dynamicMap[i].strokeColor?
					controll.value[i].strokeColor.r = controll.value[i].strokeColor.r + (controll.dynamicMap[i].strokeColor.r - controll.value[i].strokeColor.r) / 4  if controll.dynamicMap[i].strokeColor.r?
					controll.value[i].strokeColor.g = controll.value[i].strokeColor.g + (controll.dynamicMap[i].strokeColor.g - controll.value[i].strokeColor.g) / 4  if controll.dynamicMap[i].strokeColor.g?
					controll.value[i].strokeColor.b = controll.value[i].strokeColor.b + (controll.dynamicMap[i].strokeColor.b - controll.value[i].strokeColor.b) / 4  if controll.dynamicMap[i].strokeColor.b?
					controll.value[i].strokeColor.a = controll.value[i].strokeColor.a + (controll.dynamicMap[i].strokeColor.a - controll.value[i].strokeColor.a) / 4  if controll.dynamicMap[i].strokeColor.a?
				controll.value[i].size = controll.value[i].size + (controll.dynamicMap[i].size - controll.value[i].size) / 4  if controll.dynamicMap[i].size?
				if controll.dynamicMap[i].position?
					controll.value[i].position.x = controll.value[i].position.x + (controll.dynamicMap[i].position.x - controll.value[i].position.x) / 4  if controll.dynamicMap[i].position.x?
					controll.value[i].position.y = controll.value[i].position.y + (controll.dynamicMap[i].position.y - controll.value[i].position.y) / 4  if controll.dynamicMap[i].position.y?
					controll.value[i].position.z = controll.value[i].position.z + (controll.dynamicMap[i].position.z - controll.value[i].position.z) / 4  if controll.dynamicMap[i].position.z?
				if controll.dynamicMap[i].rotate?
					controll.value[i].rotate.x = controll.value[i].rotate.x + (controll.dynamicMap[i].rotate.x - controll.value[i].rotate.x) / 4  if controll.dynamicMap[i].rotate.x?
					controll.value[i].rotate.y = controll.value[i].rotate.y + (controll.dynamicMap[i].rotate.y - controll.value[i].rotate.y) / 4  if controll.dynamicMap[i].rotate.y?
					controll.value[i].rotate.z = controll.value[i].rotate.z + (controll.dynamicMap[i].rotate.z - controll.value[i].rotate.z) / 4  if controll.dynamicMap[i].rotate.z?
				i++
		return

controll.init()
staticTransformSeries = (t) ->
	inc = 0
	to = ->
		setTimeout (->
			controll.startTransform inc, t
			inc++
			to()  if inc < DEFIINE_instanceNum
			return
		), 0
		return

	to()
	return

staticTransformParallel = (t) ->
	i = 0

	while i < DEFIINE_instanceNum
		controll.startTransform i, t
		i++
	return


# controller -->
objectInit()
loop_ = ->
	cameraTimer()
	init.ctx.clearRect 0, 0, init.size.x, init.size.y
	backgroundController.draw()
	shader.shadeObject = []
	i = 0

	while i < controll.processArray.length
		controll.processArray[i] i  if controll.processArray[i]?
		i++
	controll.dynamicTimer()
	objectUpdate()
	shader.zSort()
	shader.flatShader.directionalLighting()
	invertController.iteration()
	effectTimer()
	nodeStroke.iteration()  if init.nodeStrokeFlag is true
	shader.execution()
	return

timerIteration = ->
	setTimeout (->
		loop_()
		timerIteration()
		return
	), 1000 / 30
	return

timerIteration()
motionSet = [
	{
		time: 500
		func: ->
			init.nodeStrokeFlag = true
			controll.staticFlag = "fontmap_solidcell"
			staticTransformSeries 1000
			return
	}
	{
		time: 3000
		func: ->
			i = 0

			while i < DEFIINE_instanceNum
				instanceObject[i].uniqueFlag001 = true
				i++
			return
	}
	{
		time: 1000
		func: ->
			controll.staticFlag = "freemap_disconnected"
			staticTransformSeries 800
			return
	}
	{
		time: 2500
		func: ->
			i = 0

			while i < DEFIINE_instanceNum
				instanceObject[i].uniqueFlag001 = false
				i++
			controll.dynamicFlag = 0
			init.nodeStrokeFlag = false
			controll.staticFlag = "fontmap_hackyou"
			staticTransformSeries 300
			return
	}
	{
		time: 2500
		func: ->
			controll.staticFlag = "freemap_random"
			staticTransformParallel 1000
			return
	}
	{
		time: 1000
		func: ->
			init.nodeStrokeFlag = true
			controll.dynamicFlag = 3
			return
	}
	{
		time: 2000
		func: ->
			controll.staticFlag = "fontmap_solidcell"
			staticTransformSeries 500
			return
	}
	{
		time: 2000
		func: ->
			controll.staticFlag = "fontmap_solidcell"
			staticTransformSeries 500
			return
	}
	{
		time: 2000
		func: ->
			controll.staticFlag = "freemap_random"
			staticTransformSeries 800
			return
	}
	{
		time: 2500
		func: ->
			controll.staticFlag = "freemap_random"
			staticTransformSeries 800
			return
	}
	{
		time: 2000
		func: ->
			controll.staticFlag = "freemap_random"
			staticTransformSeries 800
			return
	}
	{
		time: 3000
		func: ->
			controll.staticFlag = "freemap_disconnected"
			staticTransformSeries 500
			return
	}
	{
		time: 1500
		func: ->
			init.nodeStrokeFlag = false
			controll.dynamicFlag = 0
			controll.staticFlag = "fontmap_fullchara"
			staticTransformParallel 1000
			return
	}
	{
		time: 1500
		func: ->
			controll.dynamicFlag = 1
			return
	}
	{
		time: 2000
		func: ->
			controll.dynamicFlag = 2
			return
	}
	{
		time: 1500
		func: ->
			controll.dynamicFlag = 1
			return
	}
	{
		time: 1500
		func: ->
			init.nodeStrokeFlag = true
			controll.dynamicFlag = 4
			return
	}
	{
		time: 2500
		func: ->
			init.nodeStrokeFlag = false
			controll.dynamicFlag = 0
			controll.staticFlag = "fontmap_fullchara"
			staticTransformParallel 1000
			return
	}
	{
		time: 2000
		func: ->
			init.nodeStrokeFlag = true
			controll.dynamicFlag = 0
			controll.staticFlag = "freemap_disconnected"
			staticTransformSeries 800
			return
	}
	{
		time: 10000
		func: ->
	}
]
motionIndex = 0

motionChanger = ->
	setTimeout (->
		motionSet[motionIndex].func()
		motionIndex++
		motionIndex = 0 if motionSet.length is motionIndex
		motionChanger()
	), motionSet[motionIndex].time

motionChanger()