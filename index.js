/**
 * Created by zhuang on 2017/7/19.
 */
(function () {
    var keyboard = document.querySelector('.keyboard ul'),
        person = document.querySelectorAll('.person>div'),
        wordBox = document.querySelector('.word'),word,time = 0 , guessRight = 0;
    function getWord() {
        var words = ['mouse','rat','cow',
            'Tiger','Rabbit','Dragon','Snake',
            'Horse','sheep','Monkey','Chicken','Dog',
            'cat','Pig','Bird','eagle','pigeon','dove',
            'owl','gull','sparrow','Parrot','Penguin','goose','duck','Bat',
            'Frog','cricket'],l = words.length;
        var num = Math.floor(Math.random()*l);
        return words[num].toLocaleLowerCase();
    }
    function renderWords() {
        var argus = arguments,i = 0,l = argus[0].length,span;
        if(argus.length==1){
            for(i;i<l;i++){
                wordBox.innerHTML += '<span></span>';
            }
        }else{
            span = wordBox.getElementsByTagName('span');
            for(i;i<l;i++){
                span[argus[0][i]].innerHTML += argus[1].toLocaleLowerCase();
            }
        }

    }
    function checkWord(w) {
        var ary = [];
        w = w.toLocaleLowerCase();
        for(var i = 0,l = word.length;i<l;i++){
            if(word[i] === w){
                ary[ary.length] = i;
            }
        }
        if(ary.length!=0){
            return ary;
        }else{
            return false;
        }
    }
    function showMask(word){
       var mask = document.querySelector('.mask');
       mask.style.display = 'block';
       mask.querySelector('.text').innerText = word;
    }
    word = getWord();
    renderWords(word);
    keyboard.onclick = function (e) {
        var element = e.target,guess,result ;
        if(element.className.match('choice')||element.className.match('no')){
            return;
        }
        if(element.nodeName.toLocaleLowerCase()=='li'){
            guess = element.innerText;
            result = checkWord(guess);
            if(result){
                renderWords(result,guess);
                element.className+=' choice';
                guessRight+=result.length;
                if(guessRight==word.length){
                    showMask('Win!');
                    return ;
                }
            }else{
                element.className+=' no';
                time++;
                if(time===8){
                    showMask('Game over! Word is '+word);
                    return;
                }
                person[time-1].style.display = 'block';
            }
        }
    };
    document.querySelector('.restart').onclick = function () {
        location.reload();
    };
    console.log(word);
})();
