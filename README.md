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

    store.evict({ __ref: data.deletePost._id });

    이거는 다른 캐시 삭제할 때 사용함
