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

    복잡하지만 캐시를 수정해서 빠름
    
    
아직 캐시 지우는 법을 모르겠음
