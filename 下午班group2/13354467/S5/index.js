// Generated by LiveScript 1.3.1
(function(){
  var robot, Bubble, Button, bindingResetWhenLeaveApb, reset;
  robot = {
    initial: function(){
      var bindingRobotToApb, this$ = this;
      this.sequence = [0, 1, 2, 3, 4];
      this.count = -1;
      this.buttons = $('#control-ring .button');
      bindingRobotToApb = function(){
        $('#button .apb').click(function(){
          if (Button.allButtonEnabled()) {
            this$.shuffle();
            this$.showSequence();
            this$.count = 0;
            this$.clickNextButton(0);
          }
        });
      };
      bindingRobotToApb();
    },
    clickNextButton: function(currentSum){
      if (this.count === 5) {
        $('#info-bar').text(currentSum);
        $('#info-bar').css("background-color", "gray");
        $('#message').text('楼主异步调用战斗力感人，目测不超过' + currentSum);
      } else if (this.count >= 0) {
        this.count++;
        if (this.sequence[this.count - 1] === 0) {
          Button.aHandler(currentSum);
        } else if (this.sequence[this.count - 1] === 1) {
          Button.bHandler(currentSum);
        } else if (this.sequence[this.count - 1] === 2) {
          Button.cHandler(currentSum);
        } else if (this.sequence[this.count - 1] === 3) {
          Button.dHandler(currentSum);
        } else if (this.sequence[this.count - 1] === 4) {
          Button.eHandler(currentSum);
        }
      }
    },
    shuffle: function(){
      this.sequence.sort(function(){
        return 0.5 - Math.random();
      });
    },
    showSequence: function(){
      var str, i$, ref$, len$, i;
      str = '';
      for (i$ = 0, len$ = (ref$ = this.sequence).length; i$ < len$; ++i$) {
        i = ref$[i$];
        str += String.fromCharCode(i + 65);
      }
      $('#sequence').text(str);
    },
    reset: function(){
      this.count = -1;
      $('#sequence').text('');
    }
  };
  Bubble = (function(){
    Bubble.displayName = 'Bubble';
    var prototype = Bubble.prototype, constructor = Bubble;
    function Bubble(){
      $('#info-bar').click(function(){
        var sum, i$, ref$, len$, button;
        if ($('#info-bar').css("background-color") === "rgb(0, 0, 255)") {
          sum = 0;
          for (i$ = 0, len$ = (ref$ = $('#control-ring .button')).length; i$ < len$; ++i$) {
            button = ref$[i$];
            sum += parseInt($(button).find('.unread').text());
          }
          $('#info-bar').text(sum);
          $('#info-bar').css("background-color", "gray");
        }
      });
    }
    Bubble.reset = function(){
      $('#info-bar').text('');
      $('#info-bar').css("background-color", "gray");
    };
    return Bubble;
  }());
  Button = (function(){
    Button.displayName = 'Button';
    var sucess, prototype = Button.prototype, constructor = Button;
    Button.buttons = [];
    Button.aHandler = function(currentSum){
      if (this.buttons[0].state === 'enabled') {
        this.disableOthers(this.buttons[0]);
        this.buttons[0].waiting();
        if (sucess()) {
          $('#message').text('这是个天大的秘密');
          return this.buttons[0].getNumber(currentSum);
        } else {
          return $('#message').text('这不是个天大的秘密');
        }
      }
    };
    Button.bHandler = function(currentSum){
      if (this.buttons[1].state === 'enabled') {
        this.disableOthers(this.buttons[1]);
        this.buttons[1].waiting();
        if (sucess()) {
          $('#message').text('我不知道');
          return this.buttons[1].getNumber(currentSum);
        } else {
          return $('#message').text('我知道');
        }
      }
    };
    Button.cHandler = function(currentSum){
      if (this.buttons[2].state === 'enabled') {
        this.disableOthers(this.buttons[2]);
        this.buttons[2].waiting();
        if (sucess()) {
          $('#message').text('你不知道');
          return this.buttons[2].getNumber(currentSum);
        } else {
          return $('#message').text('你知道');
        }
      }
    };
    Button.dHandler = function(currentSum){
      if (this.buttons[3].state === 'enabled') {
        this.disableOthers(this.buttons[3]);
        this.buttons[3].waiting();
        if (sucess()) {
          $('#message').text('他不知道');
          return this.buttons[3].getNumber(currentSum);
        } else {
          return $('#message').text('他知道');
        }
      }
    };
    Button.eHandler = function(currentSum){
      if (this.buttons[4].state === 'enabled') {
        this.disableOthers(this.buttons[4]);
        this.buttons[4].waiting();
        if (sucess()) {
          $('#message').text('才怪');
          return this.buttons[4].getNumber(currentSum);
        } else {
          return $('#message').text('没错');
        }
      }
    };
    prototype.disable = function(){
      this.state = 'disabled';
      $(this.dom).css("background-color", "gray");
    };
    prototype.enable = function(){
      this.state = 'enabled';
      $(this.dom).css("background-color", "blue");
    };
    prototype.waiting = function(){
      this.state = 'waiting';
      $(this.dom).find('.unread').css("opacity", "0.7");
      $(this.dom).find('.unread').text('...');
    };
    Button.disableOthers = function(thisButton){
      var i$, ref$, len$, button;
      for (i$ = 0, len$ = (ref$ = this.buttons).length; i$ < len$; ++i$) {
        button = ref$[i$];
        if (button !== thisButton && button.state !== 'done') {
          button.disable();
        }
      }
    };
    Button.enableOthers = function(thisButton){
      var i$, ref$, len$, button;
      for (i$ = 0, len$ = (ref$ = this.buttons).length; i$ < len$; ++i$) {
        button = ref$[i$];
        if (button !== thisButton && button.state !== 'done') {
          button.enable();
        }
      }
    };
    Button.allButtonEnabled = function(){
      var i$, ref$, len$, button;
      for (i$ = 0, len$ = (ref$ = this.buttons).length; i$ < len$; ++i$) {
        button = ref$[i$];
        if (button.state !== 'enabled') {
          return false;
        }
      }
      return true;
    };
    Button.allButtonDone = function(){
      var i$, ref$, len$, button;
      for (i$ = 0, len$ = (ref$ = this.buttons).length; i$ < len$; ++i$) {
        button = ref$[i$];
        if (button.state !== 'done') {
          return false;
        }
      }
      return true;
    };
    Button.reset = function(){
      var i$, ref$, len$, button;
      for (i$ = 0, len$ = (ref$ = this.buttons).length; i$ < len$; ++i$) {
        button = ref$[i$];
        button.state = 'enabled';
        button.dom.css("background-color", "blue");
        button.dom.find('.unread').text('');
        button.dom.find('.unread').css("opacity", "0");
        $('#message').text('');
      }
    };
    sucess = function(){
      return Math.random() > 0.2;
    };
    prototype.getNumber = function(currentSum, count){
      var this$ = this;
      $.get('/', function(number, result){
        if (this$.state === 'waiting') {
          this$.state = 'done';
          this$.dom.css("background-color", "gray");
          this$.dom.find('.unread').text(number);
          this$.constructor.enableOthers(this$);
          if (this$.constructor.allButtonDone()) {
            $('#info-bar').css("background-color", "blue");
          }
          robot.clickNextButton(currentSum + parseInt(number));
        }
      });
    };
    function Button(dom, successMessage, failMessage){
      var this$ = this;
      this.dom = dom;
      this.successMessage = successMessage;
      this.failMessage = failMessage;
      this.state = 'enabled';
      this.dom.click(function(){
        if (this$.state === 'enabled') {
          this$.constructor.disableOthers(this$);
          this$.waiting();
          if (sucess()) {
            $('#message').text(successMessage);
            this$.getNumber();
          } else {
            $('#message').text(failMessage);
          }
        }
      });
      this.constructor.buttons.push(this);
    }
    return Button;
  }());
  bindingResetWhenLeaveApb = function(){
    var leave;
    leave = false;
    $('#button').on('mouseenter', function(){
      leave = true;
    });
    $('#button').on('mouseleave', function(event){
      leave = false;
      reset();
    });
  };
  reset = function(){
    Button.reset();
    Bubble.reset();
    robot.reset();
  };
  $(function(){
    var successMessages, errorMessages, i$, ref$, len$, bubble;
    successMessages = ['这是个天大的秘密', '我不知道', '你不知道', '他不知道', '才怪'];
    errorMessages = ['这不是个天大的秘密', '我知道', '你知道', '他知道', '没错'];
    for (i$ = 0, len$ = (ref$ = $('#control-ring .button')).length; i$ < len$; ++i$) {
      (fn$.call(this, i$, ref$[i$]));
    }
    bubble = new Bubble();
    robot.initial();
    bindingResetWhenLeaveApb();
    function fn$(i, dom){
      var button;
      button = new Button($(dom), successMessages[i], errorMessages[i]);
    }
  });
}).call(this);
