# Javascript 제어문

## 제어문
순차적 실행 흐름을 변화시키는 문장을 제어 구문이라고 한다. 자바 스크립트에서는 아래와 같은 제어 구문을 사용할 수 있다.

> 위에서부터 아래 방향으로 작성한 순서대로 실행하는 것을 순차적 실행이라고 한다.

| 분류 | 제어 구문 | 설명 |
|:--------:|:--------:|:--------:|
| 조건문 | if/else, switch, try/catch/finally문 | 조건에 따라 처리를 분기 |
| 반복문 | while, do/while, for, for/in, for/of | 조건을 만족하면 처리를 반복 |
| 점프문 | break, continue, return | 프로그램의 다른 위치로 이동

## if문
`if문`은 입력된 문에 따라 처리를 분기시키는 문이다. 즉, 조건의 만족 여부에 따라 처리할 작업을 선택한다. `if문`의 사용 방법은 크게 두 가지로 나뉜다.

> ~~~
> if (조건식) { 문장 }
> if (조건식) { 문장 1 } else { 문장 2 }
> ~~~

`if문`은 우리가 흔히 아는 `if문`으로, 조건식을 만족하면 <u>(조건식이 `true`라고 평가될 때)</u> `문장` 을 실행한다. 그렇지 않으면 다음 코드로 넘어간다. <u>(조건식이 `false`라고 평가될 때)</u>

`if/else문`도 우리가 아는 `if/else문`과 같다. 조건식을 만족한다면 `문장 1`을 실행하고, 그렇지 않다면 `문장 2`를 실행한다. `if/else문`은 중첩하여 사용할 수 있다.

~~~
    if (!name) //name에 falsy한 값이 들어갔을 때
    {
        name="";
        document.write("이름을 입력하세요.");
    }
    else //name에 truthy한 값이 들어갔을 때
    {
        document.write("환영합니다.");
    }

~~~

코드의 주석을 보면 `falsy한 값`과 `truthy한 값`이라는 말을 볼 수 있다. 이는 거짓으로 판명되는 값과 참으로 판명되는 값으로, 각각 8개, 11개의 값을 가지고 있다.

~~~
    //falsy한 값
    false
    null
    undefined
    0
    NaN
    ''   //빈 문자열
    ""   //빈 문자열
    document.all

    //truth한 값
    true
    {}   //빈 객체 리터럴
    []   //빈 배열 리터럴
    95   //양의 정수
    "hello"     //문자열
    new obj();
    -85  //음의 정수
    5.55    //실수
    -5.55   //음의 실수
    Infinity
    -Infinity
~~~

## switch문
`if문`이 표현식의 값에 따라 실행을 분기하고자 할 때 사용하지만 분기점을 여러 개 만들 수 있는 대신에 코드가 복잡해진다는 단점이 있다. `switch문`은 이러한 단점을 보완하여 여러 분기점을 간결하게 나타낼 수 있다.

> ~~~
>    switch(표현식) {
>        case 1: 실행문 1
>        case 2: 실행문 2
>        ...
>        case n: 실행문 n
>        default: 실행문 n+1
>    }
> ~~~

`case` 바로 뒤에 작성하는 표현식의 값을 `case 라벨의 값`이라고 한다. `switch문`이 실행되면 순차적으로 `case문`을 지나며 주어진 값과 일치하는 `case 라벨 값`을 찾는다. 만일 값이 있다면 `실행문`이 실행되고, 없다면 `default`가 실행된다. 하지만 작성자가 `default문`을 작성하지 않아 `default문`을 찾을 수 없을 시, 프로그램의 `switch문`은 종료된다.

~~~
    switch(contry) {
        case 'KOREA':
            document.write("you are korean!");
            break;
        case 'Japan':
            document.write("you are Japanese!");
            break;
        case 'USA':
            document.write("you are American!");
            break;
        default:
            document.write("you are " + contry + " pepole!");
            break;
    }
~~~

이 코드는 입력된 국적에 따라 어느 나라 사람인지를 판별해주는 코드다. 만일 `contry`의 값이 `KOREA`라면 `case 'KOREA'` 와 값이 일치하게 된다. 그러므로 관련된 문장을 실행하고 `break문`을 만나 실행을 종료하게 된다. 

## throw
`throw문`은 예외처리 문으로, 우리가 C언어에서는 볼 수 없었던 문이다.<br>
프로그램은 오류가 발생하면 그 즉시 프로그램을 종료시켜버린다. 이런 경우에 프로그램이 대처를 할 수 있도록 도와주는 구문이 예외처리 문이다.  <br>
`throw문`은 예외를 사용할 때 사용한다. 쉽게 말하자면, `try catch finally 구문`에서 처리할 수 있는 오류 조건을 만드는 구문을 `throw문`이라고 한다. 그냥 예외를 발생시키는 아이라고 이해해도 좋다. <br>
`throw 문`의 문법은 다음과 같다.

> ~~~
>     throw 표현식; //표현식의 결과값 타입은 어떤 것이라도 될 수 있다.
> ~~~

다음은 `throw 문`을 어떤 상황에서 사용하는지에 대한 예시이다.

~~~

    function plus(a) { //1부터 입력한 수 까지의 값을 더하는 함수
        var sum=0;
        // 전달 인자가 조건에 만족하지 않으면 예외를 발생시킨다.
        if (a<0)
            throw new Error('양수만 계산할 수 있습니다.');
        // 만족한다면 정상 실행한다.
        else {
            for (var i=0; i<a i++) {
                sum += i;
            }
        }
        return sum;
    } 
~~~

## try catch finally 구문
`try catch finally 구문`은 자바 스크립트의 예외 처리 기법이다. 여기서 `try 문`은 예외가 일어날지도 모르는 코드를 작성하며, `catch 문`은 `try 문`에서 예외가 발생했을 시 호출되는 문이다. `finally 문`은 `try 문`과 관계없이 항상 실행되어야 할 코드가 작성된다.  <br> 
`catch 문`과 `finally 문`은 생략 가능하지만, `try 문`은 `catch 문` 혹은 `finally 문` 둘 중 하나와는 필수적으로 같이 쓰여야 한다. <br> 
세 개의 문은 모두 `중괄호({})` 로 시작해 `중괄호({})` 로 끝난다. 설령 문장이 하나밖에 있지 않더라도 중괄호를 사용해야 한다.

try catch finally 구문의 문법은 다음과 같다.

> ~~~
>   try {
> 
>   }
>   catch {
> 
>   }
>   finally {
> 
>   }
> ~~~

다음은 try catch finally 구문의 예시이다. 여기서는 위의 function() 메소드를 사용한다.

~~~
    try {
        let num=document.getElementById('value').value;
        let sum=plus(num);
        document.write("1부터 " + num + "까지 더한 값은 " + sum + "입니다.")
    }
    catch (Error) {
        alert(Error)
    }
~~~