// Goals for next session:

/*
    Populate function column with all existing unary / binary matrix functions
    Create a 'matrix factory' div to place matrices to be operated on
    Write all MATRIX-based functions, including making the identity matrix and zero matrix
    Add onclick events to initiate these functions, from both columns
    For now, automatically store the result as a new matrix
*/


// Notes when returning to this project:

/* 
    matrixClimbingIndex only works in a single session
*/









/*

Matrix Machine
Copyright Craig Corsi 2018

This is an in-browser Javascript matrix calculator. Vectors, 
matrices, and representations are stored as objects, named,
and stored alongside properties such as 'determinant' and 'length'

GLOSSARY:

"vmr" --- 'Vector, matrix, or representation' stored as an object alongside its properties and methods.

*/


//
//
//      Temporary client-side database holding mathematical information about each vmr
//
//
//
//

var VMRDatabase = {

};



//
//
//
//  virtual operations for vectors, matrices, and representations
//
//
//
//
//
//


//  Constructs a VMR from a vector, matrix, or representation.
// The least information needed alongside the mathematical object itself is a name which will be used to name the id tag of the corresponsing div when displaying it.

function makeVMR(x, name) {
    var vmr = {
        0: x,
        'name': name
    }
    return vmr;
}

// change vmr's name property

function renameVMR(x, name) {
    x.name = name;
    return vmr;
}





//////
// Standard matrix objects such as the zero vector and identity matrix
//////


// zero vector

function vZero(n) {

    var vector = [];
    for (var i = 0; i < n; i++) {
        vector.push(0);
    }

    var vmr = {
        0: vector,
        'name': n.toString() + "-zero vector",
    }
    return vmr;
}


// zero matrix

function mZero(m, n) {

    var vector = vZero(n)[0];

    var matrix = [];
    for (var i = 0; i < m; i++) {
        matrix.push(vector.slice());
    }

    var vmr = {
        0: matrix,
        'name': m.toString() + "-by-" + n.toString() + " zero matrix",
    }
    return vmr;
}


// identity matrix

function mIdentity(n) {
    var vmr = mZero(n, n);
    for (var i = 0; i < n; i++) {
        vmr[0][i][i] = 1;
    }
    vmr.name = n.toString() + "-by-" + n.toString() + " identity matrix";
    return vmr;
}






//////
// Indexing operations, used for instance to implement row reduction
//////


// For a nonzero vector, returns the index of the first nonzero entry

function leftSupport(list) {
    var l = list.length;
    var i;
    if (list != vZero(l)[0]) {
        var i = 0;
        while (list[i] == 0) {
            i++;
        }
    } else {
        i = -1;
    }
    return i;
}


// For a nonzero vector, returns the index of the last nonzero entry

function rightSupport(list) {
    var l = list.length;
    var i;
    if (list != vZero(l)[0]) {
        var i = l - 1;
        while (list[i] == 0) {
            i--;
        }
    } else {
        i = -1;
    }
    return i;
}



//////
// Vector operations (expects vmr's as inputs)
//////

// addition of two vmr vectors

function vSum(u, v) {
    var l = u[0].length
    if (l != v[0].length) {
        console.log("Error: The vectors cannot be added")
        return undefined;
    }
    vector = [];
    for (var i = 0; i < l; i++) {
        vector.push(u[0][i] + v[0][i]);
    }
    vmr = {
        0: vector,
        'name': u.name + " + " + v.name
    };
    return vmr;
}


// subtraction of two vmr vectors

function vDifference(u, v) {
    var l = u[0].length
    if (l != v[0].length) {
        console.log("Error: The vectors cannot be added")
        return undefined;
    }
    vector = [];
    for (var i = 0; i < l; i++) {
        vector.push(u[0][i] - v[0][i]);
    }
    vmr = {
        0: vector,
        'name': u.name + " - " + v.name
    };
    return vmr;
}


// scalar multiplication of vmr vector v by number c

function vScale(v, c) {
    var l = v[0].length
    vector = [];
    for (var i = 0; i < l; i++) {
        vector.push(c * v[0][i]);
    }
    vmr = {
        0: vector,
        'name': v.name + " + " + v.name
    };
    return vmr;
}


// length / norm of a vector

function vNorm(v) {
    var total = 0;
    vec = v[0];
    for (var i = 0; i < vec.length; i++) {
        total += vec[i] ** 2;
    }
    total = Math.sqrt(total);
    return total;
}


// replace a vector with a scalar multiple of length one

function vNormalize(v) {
    var n = vNorm(v);
    console.log(n);
    var vmr = vScale(v, 1 / n);
    vmr = renameVMR(vmr, vmr.name + ' normalized');
    return vmr;
}


// dot product of two vmr vectors

function vScalarProduct(u, v) {
    var total = 0;
    var l = u[0].length;
    if (l != v[0].length) {
        console.log('The scalar product could not be computed.')
        return undefined;
    }
    for (var i = 0; i < l; i++) {
        total += u[0][i] * v[0][i];
    }
    return total;
}


// direct sum of two vmr vectors

function vDirectSum(u, v) {
    var vmr = {
        0: u[0].concat(v[0]),
        'name': u.name + " (+) " + v.name
    }
    return vmr;
}

// tensor product of two vmr vectors

function vTensorProduct(u, v) {
    var vector = [];
    for (var i = 0; i < u[0].length; i++) {
        vector = vector.concat(vScale(v, u[0][i])[0]);
    }
    var vmr = {
        0: vector,
        'name': u.name + " (x) " + v.name
    }
    return vmr;
}

//////
// Matrix operations (expects vmr's as inputs)
//////


// transpose of a vmr matrix
function mTranspose(m) {
    var name = m.name;
    m = m[0];
    var matrix = [];
    for (var i = 0; i < m[0].length; i++) {
        var vector = [];
        for (var j = 0; j < m.length; j++) {
            vector.push(m[j][i]);
        }
        matrix.push(vector);
    }
    var vmr = {
        0: matrix,
        'name': name
    }
    return vmr;
}

// returns the ith row of the vmr matrix m
function mRow(m, i) {
    var vector = m[0][i].slice();
    var vmr = {
        0: vector,
        'name': m.name + " row " + i
    }
    return vmr;
}

// returns the ith column of the vmr matrix m
function mColumn(m, i) {
    return mRow(mTranspose(m), i);
}

// sum of two vmr matrices
function mSum(m, n) {
    var name1 = m.name;
    var name2 = n.name;
    m = m[0];
    n = n[0];
    if (m.length != n.length || m[0].length != n[0].length) {
        console.log('The matrices ' + name1 + " and " + name2 + "could not be added.");
    }

    var matrix = [];
    for (var i = 0; i < m.length; i++) {
        var vector = [];
        for (var j = 0; j < m[0].length; j++) {
            vector.push(m[i][j] + n[i][j]);
        }
        matrix.push(vector);
    }

    var vmr = {
        0: matrix,
        name: name1 + " + " + name2
    }
    return vmr;
}

// scalar multiple of the vmr matrix m by scalar c
function mScale(m, c) {
    var matrix = [];
    for (var i = 0; i < m[0].length; i++) {
        matrix.push(vScale(mRow(m, i), c)[0]);
    }
    var vmr = {
        0: matrix,
        'name': m.name
    }
    return vmr;
}

// product of vmrs: matrix m with column vector v
function mLeftAction(m, v) {
    if (m[0][0].length != v[0].length) {
        console.log('The matrix and vector could not be multiplied');
        return undefined;
    }
    var vector = [];
    for (var i = 0; i < m[0].length; i++) {
        vector.push(vScalarProduct(mRow(m, i), v));
    }
    var vmr = {
        0: vector,
        'name': name
    }
    return vmr;
}

// product of vmrs: row vector v with matrix m
function mRightAction(v, m) {
    return mLeftAction(mTranspose(m), v);
}

// product of vmrs: two matrices m and n
function mProduct(m, n) {
    if (m[0][0].length != n[0].length) {
        console.log("The matrices " + m.name + " and " + n.name + "could not be multiplied.");
        return undefined;
    }
    var matrix = [];
    for (var i = 0; i < m[0].length; i++) {
        matrix.push(mRightAction(mRow(m, i), n)[0]);
    }
    var vmr = {
        0: matrix,
        'name': name
    }
    return vmr;
}







m1 = { 0: [[6, 3, 2], [6, 7, 8]] };
m2 = { 0: [[1, 2], [3, 4], [5, -6]] };

v1 = { 0: [3, 4], 'name': 'A' };
v2 = { 0: [5, 12], 'name': 'B' };
v3 = { 0: [1, 1, 1], 'name': 'C' };

console.log(mProduct(m2, m1)[0]);








//
//
//
//  DOM manipulation functions
//
//
//
//
//
//


// this integer is appended to id names to ensure uniqueness
var matrixClimbingIndex = 0;

// create an i by j matrix of input fields
function makeInputMatrix(i, j) {
    var m = $('<table>').attr({
        'class': 'matrix',
        'data-rows': i,
        'data-columns': j
    });
    for (var a = 0; a < i; a++) {
        var row = $('<tr>');

        for (var b = 0; b < j; b++) {
            var cell = $('<input>').attr({
                'size': '3',
                'type': 'text',
                'data-row': a,
                'data-column': b
            });
            var td = $('<td>').append(cell);
            row.append(td);
        }
        m.append(row);
    }
    return m;
}

// create a DOM element representing a matrix











//
//
//
//  onclick events
//
//
//
//
//
//

// on-ready preceding all onclick events
$(document).ready(function () {

    // initially hide matrix constructor windows
    $('#matrixConstructorWindowPrimitive').hide();
    $('#matrixConstructorWindow').hide();

    // Generate new matrix I: click on 'New matrix' button
    $('#newMatrix').on('click', function () {
        $('#mainMatrixWindow').slideUp();
        $('#matrixConstructorWindow').slideUp();
        $('#matrixConstructorWindowPrimitive').slideDown();
        $('#matrixConstructorInputBlock').html('');
        $('#matrixConstructorName').val('')
    });

    // Generate new matrix II: specify number of rows and columns
    $('#matrixConstructorCreatePrimitiveMatrix').on('click', function () {
        var i = parseInt($('#matrixConstructorRows').val().trim());
        var j = parseInt($('#matrixConstructorColumns').val().trim());
        // append a table of inputs into the DOM

        var mat = makeInputMatrix(i, j);
        $('#matrixConstructorInputBlock').append(mat);

        $('#matrixConstructorWindowPrimitive').slideUp();
        $('#matrixConstructorWindow').slideDown();

        // reset values from previous form
        $('#matrixConstructorRows').val('');
        $('#matrixConstructorColumns').val('');
    });

    // Generate new matrix III: specify entries and name matrix
    $('#matrixConstructorCreateMatrix').on('click', function () {
        // create a new matrix vmr object
        var matrix = [];
        var i = $('#matrixConstructorInputBlock').find('table').attr('data-rows');
        var j = $('#matrixConstructorInputBlock').find('table').attr('data-columns');
        
        // create new matrix DOM element
        var domMat = $('<table>').attr('class', 'matrix');

        // loop through inputs, grab their value or 0, place it in the corresponding matrix element (virtual and DOM)
        for (var a = 0; a < i; a++) {
            var domRow = $('<tr>');
            var matrixRow = [];
            for (var b = 0; b < j; b++) {
                var domCell = $('<td>');
                var abValue = $('#matrixConstructorInputBlock table tr:nth-child(' + (a + 1) + ') td:nth-child(' + (b + 1) + ') input').val().trim();
                domCell.append(abValue);
                domRow.append(domCell);
                matrixRow.push(abValue);
            }
            domMat.append(domRow);
            matrix.push(matrixRow);
        }

        var domBox = $('<div>').attr('class', 'object-panel matrix-panel');
        domBox.append(domMat);

        // append to DOM
        $('#matrixBank').append(domBox);

        // store mathematical information in a database (currently just local)
        var matrixName = $('#matrixConstructorName').val().trim();
        var matrixIdGen = 'vmrmat' + matrixClimbingIndex;
        matrixClimbingIndex++;

        domMat.attr('id', matrixIdGen);
        VMRDatabase[matrixIdGen] = {
            'id': matrixIdGen,
            'vmr': makeVMR(matrix, matrixName)
        }
        domBox.prepend('<h4>'+ matrixName +' =</h4>');

        // display windows accordingly, reset fields
        $('#matrixConstructorInputBlock').html('');
        $('#matrixConstructorName').val('')
        $('#matrixConstructorWindow').slideUp();
        $('#mainMatrixWindow').slideDown();
    });



























    // end of on-ready
});
