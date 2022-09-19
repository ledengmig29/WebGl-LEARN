"use strict";
var width = 500,
  height = 500,
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
  "vec2 position=vec2(0.0); void main(){ gl_Position=vec4(position,0.0,1.0); gl_PointSize=30.0;}";

//片元着色器 片元可以简单理解为是像素
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

// function draw(gl, n, u_ModelViewMatrix) {
//   //设置视角矩阵的相关信息（视点，视线，上方向）
//   var viewMatrix = new Matrix4();
//   viewMatrix.setLookAt(3, 3, 7, 0, 0, 0, 0, 1, 0);

//   //设置模型矩阵的相关信息
//   var modelMatrix = new Matrix4();
//   modelMatrix.setRotate(0, 0, 0, 1);

//   //设置透视投影矩阵
//   var projMatrix = new Matrix4();
//   projMatrix.setPerspective(30, canvas.width / canvas.height, 1, 100);

//   //计算出模型视图矩阵 viewMatrix.multiply(modelMatrix)相当于在着色器里面u_ViewMatrix * u_ModelMatrix
//   var modeViewMatrix = projMatrix.multiply(viewMatrix.multiply(modelMatrix));

//   //将试图矩阵传给u_ViewMatrix变量
//   gl.uniformMatrix4fv(u_ModelViewMatrix, false, modeViewMatrix.elements);

//   //开启隐藏面清除
//   gl.enable(gl.DEPTH_TEST);

//   //清空颜色和深度缓冲区
//   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

//   //绘制图形
//   gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
// }

gl.useProgram(program);
gl.drawArrays(gl.POINTS, 0, 1);
