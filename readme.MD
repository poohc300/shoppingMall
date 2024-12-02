## 12월 1일

### react-router-dom의 outlet의 기능에 대해 좀더 알아보기

### querystring 알아보기

## 12월 2일

#### QueryParameter

##### 쿼리 파라미터는 URL 뒤에 물음표(?)와 함께 붙은 Key Value 쌍. 여러 개의 쿼리 파라미터를 전달하려면 파라미터 사이에 앰퍼센트& 를 추가해서 하나의 문자열로 전달하면됨. queryString과 같은 말

#### Path Variable

##### 경로를 변수로 사용함 ex) /boards/100

#### 각각 언제 쓰는게 좋은지?

##### Path Variable: id를 통해 리소스를 식별하고 싶을 때 ex) /users/123 -> 회원번호 또는 Id가 123인 사용자 정보 조회

##### Query Paramter: 필터링을 하거나 정렬을 하는 경우 사용하는 것이 이상적 ex) /posts?user=abc -> 작성자가 abc인 게시글만 가져오기
