$(function() {
  $('#tto-game').data('player',0).data('playing',true);

  $('.cell').each(function(i) {
    $(this).data('player',999).data('col',(i)%4).data('row',(i-((i)%4))/4);
  });

  $('.cell').click(function(e) {

    if ($('#tto-game').data('playing')==false) return;

    var player = $('#tto-game').data('player');
    var next = (player+1) % 2;

    var row = $(this).data('row');
    var col = $(this).data('col');

    if ($(this).data('player') == 999) {
      $(this).addClass('player'+player);
      $(this).data('player',player);
      $('#tto-game').data('player',next);
      
      // now check othello
      othello(row, col, player);
      win(player);
      nextp(player);
    }
  });
});

function othello(row, col, player) {
  
  var next = (player+1) % 2;
  //console.log('Player: '+player+','+next);
  //console.log('Position: '+row+','+col);
  
  function ttr_fn(x) { x = mod(x,8); return Math.floor((x+2)/3)-2*Math.floor(x/4)-Math.floor(x/5)-Math.floor(x/7); }

  function mod(x,y) { x = x%y; if (x<0) x=x+y; return x;}

  for (x=0;x<8;x++) {
    var offr = ttr_fn(x);
    var offc = ttr_fn(x-2);
    var chkr = row + offr;
    var chkc = col + offc;
    var chkr2 = row + 2*offr;
    var chkc2 = col + 2*offc;
    var chkr3 = row + 3*offr;
    var chkc3 = col + 3*offc;
    //console.log('check: '+chkr+','+chkc);
    //console.log($(':data("row='+chkr+'"):data("col='+chkc+'")').data('player'));
    var n1 = $('#c'+chkr+chkc).data('player');
    var n2 = $('#c'+chkr2+chkc2).data('player');
    var n3 = $('#c'+chkr3+chkc3).data('player');
    //var n1 = $(':data("row='+chkr+'"):data("col='+chkc+'")').data('player');
    //var n2 = $(':data("row='+chkr2+'"):data("col='+chkc2+'")').data('player');
    //var n3 = $(':data("row='+chkr3+'"):data("col='+chkc3+'")').data('player');
    //console.log('Pos: '+chkr+','+chkc+' - '+n1);
    //console.log('Pos: '+chkr2+','+chkc2+' - '+n2);
    if (n1==next && n2==player) {
      $('#c'+chkr+chkc).data('player',player).removeClass('player'+next).addClass('player'+player);
      //console.log('Change');
    }
    if (n1==next && n2==next && n3==player) {
      $('#c'+chkr+chkc).data('player',player).removeClass('player'+next).addClass('player'+player);
      $('#c'+chkr2+chkc2).data('player',player).removeClass('player'+next).addClass('player'+player);
      //console.log('Change');
    }
  }
};

function win(player) {

  var win = false;
  var sum = 4*player;

  // rows
  for (r=0;r<4;r++) {
    if ($('#c'+r+'0').data('player') +
        $('#c'+r+'1').data('player') +
        $('#c'+r+'2').data('player') +
        $('#c'+r+'3').data('player')==sum) {
      win = true;
      $('#c'+r+'0'+',#c'+r+'1'+',#c'+r+'2'+',#c'+r+'3').addClass('win');
    }
  }
  // cols
  for (c=0;c<4;c++) {
    if ($('#c'+'0'+c).data('player') +
        $('#c'+'1'+c).data('player') +
        $('#c'+'2'+c).data('player') +
        $('#c'+'3'+c).data('player')==sum) {
      win = true;
      $('#c0'+c+',#c1'+c+',#c2'+c+',#c3'+c).addClass('win');
    }
  }
  // diag
  if ($('#c00').data('player') +
      $('#c11').data('player') +
      $('#c22').data('player') +
      $('#c33').data('player')==sum) {
    win = true;
    $('#c00,#c11,#c22,#c33').addClass('win');
  }
  if ($('#c30').data('player') +
      $('#c21').data('player') +
      $('#c12').data('player') +
      $('#c03').data('player')==sum) {
    win = true;
    $('#c30,#c21,#c12,#c03').addClass('win');
  }

  if (win) {
    $('#tto-game').data('playing',false);
    $('#reset').fadeIn();
    $('.row').css({opacity: 0.7});
  }
}

function nextp(player) {
  
  var next = (player+1) % 2;
  $('#player').removeClass('player'+player).addClass('player'+next);
}

function reset() {

  $('#tto-game').data('player',0).data('playing',true);

  $('.cell').each(function(i) {
    $(this).data('player',999).data('col',(i)%4).data('row',(i-((i)%4))/4).removeClass('player0').removeClass('player1').removeClass('win');
  });

  $('#player').removeClass('player1').addClass('player0');

  $('#reset').hide();

  $('.row').css({opacity: 1});
}
