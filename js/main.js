"use strict"
var width = 500,
    height = 400,
    cvs = document.createElement("canvas"),
    gl = cvs.getContext("webgl2") || cvs.getContext("webgl") || cvs.getContext("experimental-webgl");
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
var vertexSource = 'vec2 position=vec2(0.0); void main(){ gl_Position=vec4(position,0.0,1.0);}';
//片元着色器
var fragmentSource = 'void main(){gl_FrangColor=vec(1.0,0.0,0.0,1.0);}';
//初始化頂點着色器
var vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexSource);
gl.compileShader(vertexShader);
//檢測一下頂點著色器是否正確
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    throw gl.getShaderInfoLog(vertexShader);
};