//顶点坐标appos复制给内置变量gl_Position
//逐顶点处理数据
var vertexShader = "attribute vec4 apos; void main(){gl_Position = apps";
//片元着色器
var fragmentShader = "void main(){gl_FragColor=vec4(1.0,0.0,0.0,1.0);}";
//通过getElementById()方法获取canvas画布
var canvas = document.getElementById("webgl");
//webgl 是告诉系统绘制的是三维模型
//通过getContext()获取WebGl上下文
var gl = canvas.getContext("webgl");
//顶点着色器源码
var vertexShaderSource = document.getElementById("vertexShader").innerText;

//片元着色器源码
var fragShaderSource = document.getElementById("fragmentShader").innerText;

//初始化着色器
var program = initShader(gl, vertexShaderSource, fragShaderSource);
//获取顶点着色器的位置变量apos，即aposLocation指向apos变量。
var aposLocation = gl.getAttribLocation(program, "apos");

//类型数组构造函数Float32Array创建顶点数组
var data = new Float32Array([0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5]);

//创建缓冲区对象
var buffer = gl.createBuffer();
//绑定缓冲区对象,激活buffer
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
//顶点数组data数据传入缓冲区
gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
//缓冲区中的数据按照一定的规律传递给位置变量apos
gl.vertexAttribPointer(aposLocation, 2, gl.FLOAT, false, 0, 0);
//允许数据传递
gl.enableVertexAttribArray(aposLocation);

//开始绘制图形
gl.drawArrays(gl.LINE_LOOP, 0, 4);

//声明初始化着色器函数
function initShader(gl, vertexShaderSource, fragmentShaderSource) {
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);
  return program;
}
