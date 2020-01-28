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
    // display numbers
    var inputHTML = '<div class="extraCol"></div>';
    for (var i = 0; i < score; i++) {
        inputHTML += '<button type="button" class="btn outline dark">' + passes[passCount][i] + '</button>';
    }
    $('#numbers').html(inputHTML);

    // initialise sortable list
    var numbers = document.getElementById('numbers');
    new Sortable(numbers, {
        animation: 150,
        ghostClass: 'hover'
    });

    // display submit button
    $('#submit').html('<button class="btn btn-success" id="submitButton">Submit</button>');

    // submit button handler
    $("#submitButton").click(function(e) {
        e.preventDefault();
        submit();
    });
}

function appendOutputRow() {
    var outputHTML = '<div class="row justify-content-center" style="padding-bottom: 20px"><div class="extraCol">' + (passCount === 0 ? 'Unsorted' : 'Pass ' + passCount) + ':</div>';
    for (var i = 0; i < score; i++) {
        outputHTML += '<button class="btn btn-outline-success output">' + (passCount === 0 ? unsortedList[i] : passes[passCount][i]) + '</button>';
    }
    $('#output').prepend(outputHTML + '<div class="extraCol"></div></div>');
}

function submit() {
    var correct = true;
    var inputs = $('#input').find('.outline');
    for (var i = 0; i < score; i++) {
        if ($(inputs[i]).text() != passes[passCount + 1][i]) {
            $(inputs[i]).removeClass('dark');
            $(inputs[i]).removeClass('valid');
            $(inputs[i]).addClass('invalid');
            correct = false;
        } else {
            $(inputs[i]).removeClass('dark');
            $(inputs[i]).removeClass('invalid');
            $(inputs[i]).addClass('valid');
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