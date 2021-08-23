1번 방법

    createPost({
      variables: { post },
      refetchQueries: [{ query: GET_POSTS }],
    });

    이거는 추가적인 네트워크 작업이 필요함

2번 방법

    createPost({
      variables: { post },
      update: (store, { data }) => {
        const postData = store.readQuery({
          query: GET_POSTS,
        });

        store.writeQuery({
          query: GET_POSTS,
          data: {
            getPosts: [...postData.getPosts, data.createPost],
          },
        });
      },
    });

    이거는 캐시를 수정해서 추가적인 네트워크 작업 필요 없음

-추가-

    const identify = store.identify(data.deletePost);
    store.evict({ id: identify });
    store.evict({ id: "ROOT_QUERY", fieldName: "getPost", args: { _id: data.deletePost._id } });

    이거는 다른 캐시 삭제할 때 사용함

    id: "apollo dev 창의 이름이라고 보면 됨 // Default: "ROOT_QUERY" "
    fieldName: "이거는 예를 들면 남색 창 옆에 흰색 하위 값"
    arg: "인수"

    ex)
    cache.evict({ id: "ROOT_QUERY", fieldName: "employees" }); 모든 직원 쿼리를 삭제합니다.
    cache.evict({ id: "ROOT_QUERY", fieldName: "employees", args: { country: "US" }}); 특정 인수가 있는 하나의 쿼리를 삭제합니다.
    PS, id기본값은 "ROOT_QUERY"&이므로 생략할 수 있습니다.


문제발견!!!
    
    이게 create 라우터부터 시작을 하면 post-list 캐시가 없어서 오류가 발생함
    
    해결!
    
    update: (store, { data }) => {
        try {
          const postData = store.readQuery({
            query: GET_POSTS,
          });
          store.writeQuery({
            query: GET_POSTS,
            data: {
              getPosts: [...postData.getPosts, data.createPost],
            },
          });
        } catch (error) {
          return null;
        }
      },
      
    apollo 버전3부터 readquery에 값이 없으면 null반환이 아니라 오류 발생시킴
    그래서 try catch로 오류 발생하면 null 
