var score = 4;
var passCount = 0;
var unsortedList = [];
var passes = [];

$(function() {
    generateLevel();
});

function generateLevel() {
    passCount = 0;

    do {
        unsortedList = [];
        passes = [];

        // generate unsorted list of unique numbers
        while (unsortedList.length < score) {
            var number = Math.floor(Math.random() * score / 2 * 10) + 1;
            if(unsortedList.indexOf(number) === -1) unsortedList.push(number);
        }

        // run the bubble sort
        bubbleSort(unsortedList.slice(0));
    } while (passes.length < 4)
    
    // set the level text
    $('#level').text('Level ' + (score - 3));

    // set the input and output row
    createInputRow();
    $('#output').html('');
    appendOutputRow();
}

function bubbleSort(array) {
    var swapped;
    passes.push(array.slice(0));
    do {
        swapped = false;
        for(var i = 0; i < array.length; i++) {
            if(array[i] && array[i + 1] && array[i] > array[i + 1]) {
                var temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapped = true;
            }
        }
        passes.push(array.slice(0));
    } while(swapped);
}

function createInputRow() {
    var inputHTML = '<div class="row justify-content-center" style="padding-bottom: 20px"><div class="col-auto passCol"></div><div class="col-auto"><div class="row justify-content-center">';
    for (var i = 0; i < score; i++) {
        inputHTML += '<input type="number" class="form-control" id="input' + i + '"></input>';
    }
    $('#input').html(inputHTML + '</div></div><div class="col-auto submitCol"><button class="btn btn-success" id="submit">Submit</button></div></div></div>');

    // submit button handler
    $("#submit").click(function(e) {
        e.preventDefault();
        submit();
    });
}

function appendOutputRow() {
    var outputHTML = '<div class="row justify-content-center" style="padding-bottom: 20px"><div class="col-auto passCol align-self-center">' + (passCount === 0 ? 'Unsorted' : 'Pass ' + passCount) + ':</div><div class="row justify-content-center"><div class="col-auto">';
    for (var i = 0; i < score; i++) {
        outputHTML += '<button class="btn btn-outline-success output">' + (passCount === 0 ? unsortedList[i] : passes[passCount][i]) + '</button>';
    }
    $('#output').prepend(outputHTML + '</div><div class="col-auto submitCol"></div></div></div>');
}

function submit() {
    var correct = true;
    for (var i = 0; i < score; i++) {
        if ($('#input' + i).val() != passes[passCount + 1][i]) {
            $('#input' + i).removeClass('is-valid');
            $('#input' + i).addClass('is-invalid');
            correct = false;
        } else {
            $('#input' + i).removeClass('is-invalid');
            $('#input' + i).addClass('is-valid');
        }
    }

    if (correct === true) {
        passCount++;
        createInputRow();
        appendOutputRow();

        if (passCount === passes.length - 1) {
            alert('Finished');
            score++;
            generateLevel();
        }
    }
}