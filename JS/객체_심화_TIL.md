# JavaScript 객체 심화

## 프로토타입이란?
https://github.com/milkyway002/sinabro/blob/master/TIL/%EA%B0%9D%EC%B2%B4_TIL.md 의 글을 보면 알 수 있듯 자바 스크립트의 대부분은 모두 객체로 이루어져 있다. 자바 스크립트는 대표적인 프로토타입 언어인데, 프로토타입 언어가 무엇인지 알아보도록 하자.
<br>

프로토타입이란, **어느 한 객체의 부모 객체**라고도 할 수 있다. 자바 스크립트의 모든 객체는 자신의 부모 객체와 연결되어 있다. 그렇기 때문에 객체는 자신의 부모 객체의 프로퍼티 또는 메소드를 상속받아 사용할 수 있다. 이러한 상황에서, 부모 객체를 **프로토타입** 또는 **프로토타입 객체**라고 한다. 

> ~~~
> let obj = { a:1, b:2 };
> obj;
> ~~~

콘솔창에서 다음과 같은 명령어를 쳐 보자. 그렇다면 실행 결과는 `{ a:1, b:2 }`가 나올 것이다. 실행결과 좌측을 보면 열 수 있는 화살표를 볼 수 있는데, 그 화살표를 펼쳐본다면 `__proto__: Object` 라는 속성을 볼 수 있다. 이는 **객체 obj의 프로토타입 객체가 Object 인 것을 나타낸다.** <br>
ECMAScript spec에서는 자바 스크립트의 모든 객체는 **자신의 프로토타입을 가리키는 [[Prototype]] 이라는 숨겨진 프로퍼티를 가진다**라고 설명한다. 크롬, 파이어 폭스 등에서는 `[[Prototype]]` 이 `__proto__` 프로퍼티로 구현되어 있다. <br>
또한 프로토타입 객체는 다른 임의의 객체로 변경할 수 있기 때문에, 부모 객체인 프로토타입을 동적으로 변경할 수 있다.

## 프로토타입 체인이란?
프로토타입 체인이란 쉽게 말해서 특정 개체의 프로퍼티나 메소드를 접근하려고 할 때, 그 객체에 접근하려는 프로퍼티 혹은 메소드가 없다면 `[[Prototype]]` 프로퍼티가 가리키는 링크를 따라 자신의 부모 객체에 있는 프로퍼티나 메소드를 차례대로 검색하는 것을 말한다. 

> ~~~
> let obj = {
>   name: "hello",
>   age: 12
> };
> 
> console.log(obj.hasOwnProperty('name')); //true
> ~~~

위의 코드를 보면 `odj`라는 객체에는 hasOwnProperty라는 메소드가 없는 것을 볼 수 있다. 그런데도 불구하고 결과가 정상적으로 출력되는 현상을 볼 수 있는데, 이것이 프로토타입 체인이 실행된 대표적인 예시이다. `obj` 객체의 부모 객체인 `Object`에서 메소드 `hasOwnProperty()` 를 호출하였기 때문에 정상적으로 실행이 되는 것이다.

### 리터럴 방식으로 생성된 객체의 프로토타입 체인
리터럴 방식으로 생성된 객체는 결국엔 모두 `Object()` 생성자 함수를 통해 생성된다. `Object()` 생성자 함수도 결국 함수이기 때문에 property 프로퍼티를 가진다.

> `[[Property]]`프로퍼티와 `property` 프로퍼티는 다른 개념이다. `[[Property]]` 프로퍼티는 모든 객체가 가지고 있는 프로퍼티이며 자신의 부모 객체를 가리키지만, `property` 프로퍼티는 함수 객체만 가지고 있으며 생성자 함수로 함수를 생성할 때 그 함수를 통해 생성될 객체의 부모 객체를 가리킨다.
<br>

아래 예시를 살펴보자.

~~~
let person = {
  name: 'Lee',
  gender: 'male',
  sayHello: function(){
    console.log('Hi! my name is ' + this.name);
  }
};

console.dir(person);

console.log(person.__proto__ === Object.prototype);   // ① true
console.log(Object.prototype.constructor === Object); // ② true
console.log(Object.__proto__ === Function.prototype); // ③ true
console.log(Function.prototype.__proto__ === Object.prototype); // ④ true
~~~

객체 `person`의 프로토타입 객체는 `Object.prototype`와 같으므로 1번이 성립되고, `Object.prototype.constructor`는 `Object`라 할 수 있으므로 2번이 성립된다. 객체 리터럴로 객체를 생성하는 것은 생성자 함수 `Object()`를 통해 만드는 것과 같으므로 `Object.__proto__`는 `Function.prototype`과 같다고 할 수 있고, `Function.prototype.__proto__`는 `Object.prototype`과 같다고 할 수 있다. <br>
결론적으로, **객체 리터럴을 사용하여 객체를 생성한 경우, 그 객체의 프로토타입 객체는 Object라고 할 수 있다.**

> constructor는 자신을 생성한 객체를 가리킨다.

### 생성자 함수로 생성된 객체의 프로토타입 체인
생성자 함수로 객체를 생성하기 위해서는 우선 함수 정의가 필요한데, 이는 모두 함수 리터럴 방식을 사용한다. 이 함수 리터럴 방식은 `Function()` 생성자 함수로 함수를 생성하는 것을 단순화 시킨 것이다. 그러므로 생성자 함수로 생성한 모든 객체는 `Function()` 생성자 함수로 생성하는 것이라 할 수 있고, 이는 프로토타입 객체가 `Function.prototype`이라는 것을 가리킨다.

~~~
function Person(name, gender) {
  this.name = name;
  this.gender = gender;
  this.sayHello = function(){
    console.log('Hi! my name is ' + this.name);
  };
}

var foo = new Person('Lee', 'male');

console.dir(Person);
console.dir(foo);

console.log(foo.__proto__ === Person.prototype);                // ① true
console.log(Person.prototype.__proto__ === Object.prototype);   // ② true
console.log(Person.prototype.constructor === Person);           // ③ true
console.log(Person.__proto__ === Function.prototype);           // ④ true
console.log(Function.prototype.__proto__ === Object.prototype); // ⑤ true
~~~

위의 예시를 보면 알 수 있듯 `Function.prototype`은 `Object.prototype`과 같다고 할 수 있다. 생성자 함수로 생성된 객체의 프로토타입 객체도 결론적으로는 `Object.prototype`이라고 할 수 있다. <br>
여기에서 우리는 객체 리터럴이나 생성자 함수나 모두 프로토타입이 `Object.prototype` 객체에서 프로토타입 체인이 끝나는 것을 볼 수 있다. 그렇기 때문에 `Object.prototype`객체를 **프로토타입 체인의 종점** 이라고 한다.

## 기본 자료형의 확장 (래퍼 객체(wrapper object))
자바 스크립트에서 기본 자료형을 제외한 모든 것들은 모두 객체로 동작된다. 하지만 자바 스크립트를 다루다보면 기본 자료형이 객체와 유사하게 동작하는 것을 볼 수 있을 것이다. 이는 왜 그런 것일까? 간단한 예시를 살펴보자. 

~~~
let str = "hello";

console.log(typeof str) // String
console.log(str.constructor === String) //true
console.dir(str) //hello
~~~

`str`은 기본 자료형인 `String` 타입이다. 그렇기 때문에 프로퍼티나 메소드를 가질 수 없다. 하지만 위의 예시처럼 **기본 자료형으로 프로퍼티나 메소드를 호출할 때 기본 자료형과 연관된 객체로 일시적으로 변환되어 프로토타입 객체를 공유하게 된다.** 하지만 기본 자료형은 객체가 아니므로 프로퍼티나 메소드를 추가할 수 없다. 즉, **임시로 객체를 하나 만드는 것**이라고 할 수 있다.<br>
하지만 이렇게 생성된 임시 객체는 프로퍼티의 참조가 끝나면 즉시 삭제된다. 콘솔창에 아래 명령어를 입력해보자.

~~~
str.someProperty = 212;
str.someProperty; // undefined
~~~

`str.someProperty`에 212를 성공적으로 할당했지만, 다시 호출했을 때 나오는 값은 `undefined`로 출력되는 것을 볼 수 있다. 이는 임시 객체가 생성되었다 바로 삭제된 것을 확인할 수 있다. 결론적으로 이것은 **기본 자료형에 프로퍼티를 추가할 수 없다**는 것을 나타낸다. <br>
이와 같이 기본 자료형에서 프로퍼티나 메소드를 사용할 수 있도록 임시 객체를 생성했을 때, 생성된 임시 객체를 **래퍼 객체(warpper Object)**라고 한다. 보통 래퍼 객체는 원시 타입을 감싸는 형태로 사용된다.


## 프로토타입 체인 동작 조건
프로토타입 체인 동작 조건은 간단하다. **객체의 프로퍼티를 참조하는 경우, 해당 객체에 프로퍼티가 없는 경우** 프로토타입 체인이 동작한다. <br>
하지만 객체에 값을 할당하는 경우에는 **동작하지 않는다.** 이는 객체에 프로퍼티가 있을 경우 값을 할당하고, 없을 경우 동적으로 추가하여 할당하기 때문이다.

~~~
function Card(color) {
this.color = color;
}

Card.prototype.number = 'A';

console.log(c1.number); // A
console.log(c2.number); // A

c1.number = "5";

console.log(c1.number); // 5
console.log(c2.number); // A
~~~

## 프로토타입 객체 변경
당연하게도 객체를 생성할 때, 프로토타입 객체는 결정이 된다. 하지만 결정된 프로토타입 객체는 다른 객체로 변경이 가능하다. 이는 프로토타입 객체를 동적으로 변경할 수 있다는 소리와 같다. 이러한 특징을 활용하여 객체의 상속을 구현할 수 있다.
<br>
단, 이 때 주의할 것은 프로토타입 객체를 변경하면
<br>
1. 프로토타입 객체 변경 시점 이전에 생성된 객체
    * 기존 프로토타입 객체를 [[Prototype]] 프로퍼티에 바인딩 한다.
2. 프로토타입 객체 변경 시점 이후에 생성된 객체
    * 변경된 프로토타입 객체를 [[Prototype]] 프로퍼티에 바인딩 한다.

~~~
function Person(name) {
  this.name = name;
}

var foo = new Person('Lee');

// 프로토타입 객체의 변경
Person.prototype = { gender: 'male' };

var bar = new Person('Kim');

console.log(foo.gender); // undefined
console.log(bar.gender); // 'male'

console.log(foo.constructor); // ① Person(name)
console.log(bar.constructor); // ② Object()
~~~

1번의 `constructor` 프로퍼티는 `Person(name)` 을 가리킨다. <br>
2번의 `constructor` 프로퍼티는 프로토타입 객체의 변경 후 생성되었기 때문에 `Object()`를 가리킨다. 

> 프로토타입 객체가 변경되면서 일반 객체로 변경되었기 때문이다. 즉, Person.prototype.constructor 프로퍼티가 사라지며 Person.prototype과의 연결이 깨진다고 할 수 있다.
