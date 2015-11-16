(function (shaderLoader) {
  shaderLoader.load({
    vert: 'vertex-shader.vert',
    frag: 'fragment-shader.frag'
  }, init);

  function init(shaders) {
    var canvas = document.getElementById('view');
    var gl = getWebGLContext(canvas);

    if (!initShaders(gl, shaders.vert, shaders.frag)) {
      console.log('bad shaders');
    }

    var n = initVertexBuffers(gl);

    var u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
    var u_LightColor = gl.getUniformLocation(gl.program, 'u_LightColor');
    var u_LightDirection = gl.getUniformLocation(gl.program, 'u_LightDirection');

    gl.uniform3f(u_LightColor, 0.5, 1.0, 1.0);
    var lightDirection = new Vector3([0.5, 3.0, 4.0]);
    lightDirection.normalize();
    gl.uniform3fv(u_LightDirection, lightDirection.elements);

    var mvpMatrix = new Matrix4();

    mvpMatrix.setPerspective(30, 1, 1, 100);
    mvpMatrix.lookAt(3, 3, 7, 0, 0, 0, 0, 1, 0);

    gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
  }
})(window.shaderLoader);

function initVertexBuffers(gl) {

  var verticesColors = new Float32Array([
    1.0, 1.0, 1.0,   1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0,   1.0, 0.0, 1.0,
    -1.0, -1.0, 1.0,  1.0, 0.0, 0.0,
    1.0, -1.0, 1.0,   1.0, 1.0, 0.0,
    1.0, -1.0, -1.0,  0.0, 1.0, 0.0,
    1.0, 1.0, -1.0,  0.0, 1.0, 1.0,
    -1.0, 1.0, -1.0,  0.0, 0.0, 1.0,
    -1.0, -1.0, -1.0,  0.0, 0.0, 0.0
  ]);

  var normals = new Float32Array([
    0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0
  ]);

  var indices = new Uint8Array([
    0, 1, 2,  0, 2, 3,
    0, 3, 4,  0, 4, 5,
    0, 5, 6,  0, 6, 1,
    1, 6, 7,  1, 7, 2,
    7, 4, 3,  7, 3, 2,
    4, 7, 6,  4, 6, 5,
  ]);

  var vertexColorBuffer = gl.createBuffer();
  var indexBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

  var FSIZE = verticesColors.BYTES_PER_ELEMENT;

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
  gl.enableVertexAttribArray(a_Position);

  var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
  gl.enableVertexAttribArray(a_Color);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return indices.length;
  
}
