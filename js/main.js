"use strict";
var width = 500,
  height = 400,
  cvs = document.createElement("canvas"),
  gl =
    cvs.getContext("webgl2") ||
    cvs.getContext("webgl") ||
    cvs.getContext("experimental-webgl");
if (!gl) {
  alert("GG");
}
cvs.width = width;
cvs.height = height;
gl.viewport(0, 0, width, height);
document.body.appendChild(cvs);
gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

//頂點着色器
var vertexSource =
  "vec2 position=vec2(0.0); void main(){ gl_Position=vec4(position,0.0,1.0); gl_PointSize=10.0;}";

//片元着色器
var fragmentSource = "void main(){gl_FragColor=vec4(1.0,0.0,0.0,1.0);}";

//初始化頂點着色器
var vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexSource);
gl.compileShader(vertexShader);

//檢測一下頂點著色器是否正確
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
  throw gl.getShaderInfoLog(vertexShader);
}

//初始化片元着色器
var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentSource);
gl.compileShader(fragmentShader);

//檢測一下程序是否連接正確
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
  throw gl.getShaderInfoLog(fragmentShader);
}
//初始化程序
var program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

//檢測程序是否鏈接正確
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  throw gl.getShaderInfoLog(program);
}

gl.useProgram(program);
gl.drawArrays(gl.POINTS, 0, 1);
