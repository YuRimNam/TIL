# DOM 다루기

## DOM이란 무엇인가?
DOM은 **문서 객체 모델(The Document Object Model)** 의 줄임말로, HTML, XML 문서의 프로그래밍 인터페이스다. <br>
우리가 웹 퍼블리싱을 위해 텍스트 파일을 작성하면 퍼블리싱을 한 그대로 웹 브라우저에서 그 모습을 확인할 수 있다. 하지만 브라우저는 **텍스트 파일을 인지하지 못한다.** 그런데 어떻게 브라우저에서 우리가 퍼블리싱을 한 모습을 볼 수 있는걸까? <br>
우리가 작성한 텍스트 파일을 브라우저에서 보려면 브라우저가 이해할 수 있는 구조로 메모리에 올려야 하는데, 브라우저의 렌더링 엔진은 웹 문서를 로드하고 파싱한 이후에 웹 문서를 브라우저가 이해할 수 있는 구조로 구성하여 메모리에 올리게 된다. 이러한 과정을 **DOM** 이라고 한다. <br> DOM은 **문서 객체 모델**의 줄임말이라고 하였다. 즉, DOM은 우리가 작성한 문서를 각각의 객체로 만들고, 이 객체들을 부자 관계로 표현할 수 있는 **트리 구조**로 구성한 것이 DOM인 것이다. <br> <br> 
DOM은 아래의 두 가지 기능을 담당한다.

1. HTML 문서에 대한 모델 구성 (DOM tree)
2. HTML 문서 내의 각 요소에 접근 / 변경 (DOM API)

> 웹 문서를 작성하다 보면 동적 변경이 필요한 부분이 상당히 많다. 그래서 *DOM은 웹 동적 변경을 위해 프로그래밍 언어가 자신에게 접근, 수정을 할 수 있는 방법을 제공*하는데, 보통 프로퍼티와 메소드를 갖는 **자바 스크립트 객체**로 제공이 된다. 이를 **DOM API** 라고 한다. <br>
즉, 정적인 웹 페이지에 접근하여 동적으로 변경하려면 필히 **DOM에 접근하여 적재된 메모리를 수정**해야 한다는 것이며, 이 때 필요한 것들이 자바 스크립트에 객체로 제공이 되는 **DOM API**인 것이다. 이 DOM API에는 *적재된 메모리에 접근, 변경하는 프로퍼트와 메소드들이 담겨있다.*

### DOM tree
**DOM tree**는 브라우저 렌더링 후 메모리에 적재하기 위해 생성하는 모델을 의미한다. DOM tree라 불리는 이유는 객체의 트리로 구조화가 되어있기 때문이다. 가령 아래와 같은 HTML 코드가 있다고 가정해보자.

~~~html
<!DOCTYPE html>
<html>
    <head>
        <style>
            #color {
                color: #070707;
            }
        </style>
    </head>
    <body>
        <div>
            <h1>Hello, Sinabro!</h1>
            <p id="color">Sinabro!</p>
        </div>
    </body>
</html>
~~~

이런 상황에서는 트리 구조가 다음과 같게 된다.

~~~
Document (문서 노드)
│
html (요소 노드) 
└ head (요소 노드)
    └ style (요소 노드) - attribute (어트리뷰트 노드)
└ body (요소 노드)
    └ div (요소 노드)
        └ h1 (요소 노드)
           └ Hello, Sinabro! (텍스트 노드)
        └ p (요소 노드) - attribute (어트리뷰트 노드)
           └ Sinabro! (텍스트 노드)
~~~

DOM에서 모든 요소, 텍스트, 어트리뷰트는 하나의 객체이며, 이들은 모두 *Documnet 객체*의 자식이다. 요소의 중첩 관계는 객체 트리로 구조화 하여 부자 관계로 나타낸다. <br>
자바스크립트의 모든 것이 객체인 것처럼, **DOM의 진입점은 Document 객체이며, 끝 역시 텍스트를 나타내는 객체**이다. <br>
트리 노드의 종류는 위에서 보이듯이 총 4가지이다. <br>

1. 문서 노드
   - 문서 노드는 트리의 최상위에 위치한다. (Document)
   - 요소, 어트리뷰트, 텍스트 노드에 접근하려면 제일 먼저 문서 노드에 접근해야 한다.
   - DOM tree에 접근하기 위한 시작점이다. 
2. 요소 노드
   - HTML 요소를 나타내는 요소이다.
   - 이는 중첩 관계에 의해 부자 관계를 형성한다. 이를 통해 정보를 구조화한다.
   - 문서의 구조를 서술하는 노드이다.
   - 어트리뷰트, 텍스트 노드에 접근하려면 요소 노드에 접근해야 한다.
   - 모든 요소 노드는 각 노드의 특성을 구별하기 위해 HTMLElement 객체를 상속한 객체로 구성된다. 
3. 어트리뷰트 노드
    - 어트리뷰트 노드는 요소 노드의 어트리뷰트를 나타내는 노드이다.
    - 이 노드는 요소 노드의 자식 노드가 아니라 해당 요소 노드의 일부로 표현된다.
    - 따라서 요소 노드에 접근하면 해당 요소 노드의 어트리뷰트 노드를 참조, 변경할 수 있다.
4. 텍스트 노드
    - 요소 노드의 텍스트를 이루는 노드이다.
    - 더 이상 자식 노드를 가질 수 없는 노드이다.
    - 즉, DOM tree의 최하위 노드이다.

<br>

DOM tree에 있는 각 요소 노드를 변경하려면 *조작하고자 하는 요소를 선택, 혹은 탐색한 이후 그 요소의 컨텐츠, 어트리뷰트 노드 등을 변경*해야 한다. <br>
자바스크립트는 이것에 필요한 수단을 제공하는데, 이것이 바로 아까 언급했던 **DOM API**이다.

## DOM 조작 - 순회, 추가, 삭제, 이동
DOM API에는 DOM을 조작하는 여러가지 기능들이 메소드로 제공된다. 이 메소드들은 요소 선택, 탐색, 접근, 수정, 조작 등 여러가지를 제공하는데, 대표적으로 순회, 추가, 삭제, 이동을 알아보도록 하겠다.

### 순회
순회는 말 그대로 하나의 요소를 기점으로 그 요소의 부모, 자식 노드를 탐색하는 기법이다. 제공하는 메소드는 다음과 같다.

~~~ JS
let child = document.getElementById('color');
let parent = child.parentNode; 
parent.id = 'no-show';
~~~

> 제공하는 메소드는 `parentNode`로, 해당 노드의 부모 노드를 탐색한다. 위의 코드는 `color`라는 `id`를 가진 요소 노드를 찾아 그 부모 노드의 `id`을 `no-show`로 바꾼 코드이다. `HTMLElement`를 상속받은 객체를 리턴한다.

~~~ js
let parent = document.getElementByID('parent');

parent.firstChild.id = 'show';
parent.lastChild.id = 'no-show'; 
~~~

> 제공하는 메소드는 `firstChild` 와 `lastChild` 로, 해당 노드의 첫 번째 자식 노드와 마지막 자식 노드를 탐색하는 메소드이다. 위의 코드는 `parent`라는 `id`를 가진 요소 노드를 찾아 첫 번째 자식 노드의 `id`는 `show`로, 마지막 자식 노드의 `id`는 `no-show`로 바꾼 코드이다. 하지만 자식 노드를 탐색하는 메소드는 줄바꿈이나 공백 등을 텍스트 노드 로 취급하기 때문에, 이를 사용하려면 HTML의 공백을 제거하거나 `JQuery`를 사용한다.  

이 외에도 여러가지 메소드가 있다. <br>

> .hasChildNodes() -> 자식 노드가 있는지 확인하고, 불린값을 반환 <br>
> .childeNodes -> 자식 노드의 컬렉션을 NodeList형식으로 반환 <br>
> .children -> 자식 노드의 컬렉션을 HTMLCollection 형식으로 반환 <br>
> .previousSibling, .nextSibling -> 형제 노드를 탐색

### 추가
문서에 요소를 추가하는 메소드는 다음과 같다.

>innerText <br>
>innerHTML

~~~js
let color = document.getElementById('color');

color.innerText = 'hello everyone';
~~~

> 위의 코드는 `id`가 `color`인 요소 노드에 `hello everyone`이라는 글을 추가한 코드이다. innerHTML은 요소의 모든 컨텐츠(자식 요소 포함)에 접근 할 수 있다. 하지만 innerText는 텍스트 노드만 접근할 수 있을 뿐더러 비표준이고, css에 순종적이며, 느리다는 단점이 있기 때문에 사용을 권장하지 않는다.

innerHTML을 사용하지 않고서 요소를 추가하려면 DOM을 직접 조작해야 한다.  <br>

> .createElement(tagName) -> 태그를 인자로 전달해 요소 생성 <br>
> .createTextNode(text) -> 텍스트 내용을 인자로 전달해 텍스트 노드 생성 <br>
> appendChild(Node) -> 인자로 전달한 노드를 마지막 자식 요소로 DOM tree에 추가

~~~ js
//div 태그를 인자로 전달하여 div 요소 노드를 생성
let newEle = document.createElement('div');

//hello~~ 라는 내용의 텍스트 노드 생성
let newTex = document.createTextNode('hello~~');

//newTex를 newEle의 자식 노드로 DOM tree에 추가
newEle.appendChild(newTex);
~~~

innerHTML과 직접 DOM을 조작하는 방법 외에, innerHTML과 비슷한 방법이 하나 더 있다. <br>

> insertadjacentHTML(position, string) -> 인자로 태그를 넣을 위치, 삽입할 텍스트를 기반으로 DOM tree에 노드를 삽입한다. 첫 번째 인자로 넘길 수 있는 값은 다음과 같다: beforebegin, afterbegin, beforeend, afterend

~~~HTML
…
<!-- beforebegin -->
<p>
    <!-- afterbegin -->
    hello
    <!-- beforeend -->
</p>
<!-- afterend -->
~~~

### 삭제
삭제는 선택한 노드를 삭제할 수 있다. <br>

> removeChild(Node) -> 인자로 전달한 노드를 DOM tree에서 제거함

~~~js
//div 태그를 인자로 전달하여 div 요소 노드를 생성
let newEle = document.createElement('div');

//hello~~ 라는 내용의 텍스트 노드 생성
let newTex = document.createTextNode('hello~~');

//newTex를 newEle의 자식 노드로 DOM tree에 추가
newEle.appendChild(newTex);

//newEle의 자식 노드인 newTex를 DOM tree에서 제거
newEle.removeChild(newTex);
~~~

`removeChild()` 메소드 역시 DOM을 직접 조작하는 메소드이다.

### 이동


## 동적으로 엘리먼트의 스타일 다루기
DOM API에서 제공하는 style 프로퍼티를 사용하면 inline 스타일 선언을 생성할 수 있다. 주로 특정 요소에 inline 스타일을 지정하는 경우에 사용한다. 

~~~js
let element = documnet.getElementById('color');

element.style.color = 'black';
element.style.fontsize = '12pt';
~~~

위와 같은 코드를 작성하면, `color`라는 `id`를 가진 태그에 inline 스타일로 color와 fontsize를 지정하게 된다. <br>
이 외에도 어트리뷰트 노드를 접근, 수정하는 메소드/프로퍼티로 동적으로 엘리먼트의 스타일을 다룰 수 있다.

> className -> class의 값을 취득/변경한다. 값을 할당하는 경우, class가 없을 시 class를 추가하고 할당한다. <br>
> id -> id의 값을 취득/변경한다. 값을 할당하는 경우, id가 없을 시 id를 추가하고 할당한다. <br>
> hasAttribute(attribute) -> 인자로 넘긴 어트리뷰트가 있는지 없는지 검사 후 불린 값으로 나타낸다. <br>
> getAttribute(attribute) -> 인자로 넘긴 어트리뷰트의 값을 취득한다. <br>
> setAttribute(attrubute, value) -> 어트리뷰트와 어트리뷰트 값을 설정한다.
> removeAttribute(attribute) -> 지정한 어트리뷰트를 제거한다.

## 이벤트 버블링, 이벤트 캡처링, 이벤트 위임
먼저 들어가기에 앞서 먼저 알아두어야 할 지식이 있다. 바로 **이벤트 등록**이다. 이벤트 등록은 쉽게 말해서 **이벤트를 동작시키게 하는 매개체**이라고 할 수 있다. <br>
버튼을 누르거나 특정 요소를 클릭했을 시 이벤트가 발생되는 경우는 웹에서 흔히 볼 수 있다. 이처럼 **웹에서 사용자의 입력을 받기 위해 필요한 기능**을 이벤트 등록이라고 한다. 사용자가 이벤트 등록을 하게 되면 브라우저가 **이벤트의 발생을 감지**하고 이벤트를 실행시키는데, 이하 **이벤트 버블링**과 **이벤트 캡처링**은 브라우저에서 이벤트의 발생을 감지하는 방식이다.

### 이벤트 버블링
**이벤트 버블링**이란, 하나의 이벤트가 발생했을 때 그 이벤트가 **상위 요소들에게 전달되어 가는, 쉽게 말해 올라가는** 방식이다. 아래와 같은 코드가 있다고 가정해보자.

~~~HTML
...
<div class="first">
    <div class="middle">
        <div class="last">
        </div>
    </div>
</div>
~~~

~~~js
let divs = document.querySelectorAll('div');

divs.forEach(function(div) {
    div.addEventListener('click', Event); 
});

function Event() {
    console.log(event.currentTarget.className);
}
~~~

class가 last인 div를 클릭하게 되면 결과는 다음과 같게 나온다.

~~~
last
middle
first
~~~

이렇게 결과가 나오는 경우는 이벤트 버블링으로 이벤트를 감지하기 때문이다. last 박스를 클릭하면 middle로 이벤트가 전달이 되고, middle 박스에서 코드가 실행되어 middle이 콘솔창에 나오고 first 박스로 이벤트를 전달한다. first 박스에서도 코드가 실행되기 때문에 first까지 콘솔창에 나오게 되는 것이다. <br>
만일 특정 div태그에 이벤트가 등록되어 있다면 다음과 같은 결과는 나오지 않는다. **태그별로 이벤트가 등록되어 있었기 때문에** 이러한 결과가 나오게 된 것이다.

### 이벤트 캡처링
이벤트 캡처링은 이벤트 버블링과는 반대로 **상위 요소에서 이벤트가 발생한 하위 요소까지 탐색을 하여 내려가는 방식**이다. 브라우저의 기본적인 감지 방식은 이벤트 버블링이다. 이것을 이벤트 캡처링으로 바꾸려면, `addEventListener()`의 `option` 객체에서 `capture: ture`를 설정해주면 된다. 아까와 같은 코드를 아래와 같게 바꿨다고 해보자.

~~~js
let divs = document.querySelectorAll('div');

divs.forEach(function(div) {
    div.addEventListener('click', Event, {
        capture: ture
    }); 
});

function Event() {
    console.log(event.currentTarget.className);
}
~~~

결과는 이렇게 바뀐다.

~~~
first
middle
last
~~~

만일 이벤트 전파를 원하지 않는다면, `.stopPropagtion()`이라는 메소드를 사용하면 된다. 이 메소드는 **이벤트 버블링일 땐 이벤트를 상위 요소로 전달하는 것을 방해하고, 이벤트 캡처링일 땐 클릭한 요소의 최상위 요소의 이벤트만 실행시키고 하위 요소로 이벤트를 전달하지 않게 된다.**

### 이벤트 위임
**이벤트 위임**이란 이벤트 리스너를 추가한 이후에 생성된 요소 에도 이벤트를 전달할 수 있게끔 해주는 것이다. 아래와 같은 코드가 있다고 가정을 해보자.

~~~HTML
...
<ul>
    <li>
        <input type="checkbox" id="one" />
        <label for="one">약 먹기</label>
    </li>
    <li>
        <input type="checkbox" id="two" />
        <label for="two">밥 먹기</label>
    </li>
</ul>
~~~

~~~js
let inputs = document.querySelectorAll('input');
inputs.forEach(function(input) {
	input.addEventListener('click', function(event) {
		alert('완료');
	});
});
~~~

위와 같은 코드는 input 태그를 클릭하게 되면 완료 라는 알림창이 뜨게 된다. js 코드에 이벤트 리스너를 추가한 이후에 새 요소를 만들면 그 요소에는 이벤트 리스너가 추가되어 있지 않기 때문에 알림창이 뜨지 않게 되는데, 이와 같은 경우에는 **ul태그, 즉 상위 태그에 이벤트 리스너를 추가**하면 된다. **이벤트 버블링**을 이용한 것이다. `Event 객체`를 사용하면 input 태그에만 이벤트를 전달할 수 있다.

## Event handling (EventListener, Event Object)
자바 스크립트의 코드 대부분은 이벤트에 의해 작동이 된다. 이벤트란 사용자의 입력에 따라 발생하는 것을 말하는데, 이러한 이벤트를 관리하는 것이 **이벤트 핸들링(Event handling)** 이다. <br>

### EventListener
이벤트 리스너(EventListener)는 이벤트 타겟(Event Target) 객체로부터 발생한 이벤트를 처리하기 위한 오브젝트이다. 이벤트 리스너는 이벤트가 추가된 이후 속해있는 해당 이벤트에 대해 **항상 대기중인 상태**를 가진다. 그러다 이벤트가 실행되면, **이벤트 리스너가 실행**된다. 다음은 이벤트 리스너의 대표적인 코드다.

~~~js
window.onload = function() {
    alert('ready!');
}
~~~

위 코드는 window가 onload 될 때, 함수를 실행하여 ready! 라는 알림창을 띄우게 된다. 이벤트 리스너는 항상 on + '이벤트 명' 으로 명명된다. 예시로 `onClick`, `onChange` 등이 있다. <br>
이 외에도 여러 태그에 각각 이벤트를 지정할 수 있는데, 이는 위에서 사용했듯 `addEventListener` 메소드를 사용한다. 

### Event Object
이벤트 객체(Event Object)는 이벤트를 발생시킨 요소와 발생한 이벤트에 대한 정보를 저장하는 객체이다. 이벤트가 발생하면 이벤트 객체는 **동적으로 생성**되며, 이벤트를 처리하는 **이벤트 핸들러에 인자로 전달**된다. 

~~~HTML
…
<p>클릭하면 클릭한 좌표가 나옵니다.</p>
<div id="message"></div>
<script>
    function ShowMsg(e) {
        let msg = documnet.getElementById('message');
        msg.innerHTML = 'X :' + e.clinetX + '<br>' + 'Y :' + e.clientY;
    }
    addEventLisntener('click', ShowMsg);
</script>
~~~

위와 같은 코드는 이벤트 객체를 전달해주지 않았지만 정상적으로 이벤트 객체에 접근해 X와 Y좌표를 나타낸다. 바로 **이벤트 객체는 암묵적으로 전달**되기 때문이다. 하지만 아무리 암묵적으로 전달된다 하더라도 **이벤트 객체를 전달받을 매개변수는 선언**하여야 한다. 

## Event handling (keyboard control - Form control)

### keyboard control
우리는 사용자의 편의를 위해 **마우스로만 작동하는 이벤트 뿐만아니라 키보드를 눌렀을 때 작동하는 이벤트**도 당연히 고려를 해야한다. 이것들은 흔히 키보드 이벤트(Keyboard Event) 라고 불린다. <br>
키보드 이벤트에는 세 가지가 있다. 바로 **keydown, keypress, keyup**이다. 이벤트 발생 순서는 keydown -> keypress -> keyup 순으로 나열된다. <br>

1. keydown
    - 키를 누르고 있을 때 발생하는 이벤트
2. keypress
    - 키를 누르고 뗏을 때 발생하는 이벤트
3. keyup
    - 누르고 있던 키를 뗄 때 발생하는 이벤트

### Form control
이벤트는 폼 태그(`<form></form>`)로도 발생이 된다. 폼 태그의 이벤트에는 네 가지가 있는데, input, change, submit, reset이다.

1. input
    - input 혹은 textarea 요소의 값이 변경되었을 때 발생하는 이벤트
2. change
    - select box, checkbox, radio button의 상태가 변경되었을 때 발생하는 이벤트
3. submit
    - form을 submit할 때 발생하는 이벤트
    - 주로 버튼 또는 키를 눌렀을 때
4. reset
    - reset 버튼을 클릭할 때 발생하는 이벤트
    - 최근에는 사용을 자주 하지 않음
