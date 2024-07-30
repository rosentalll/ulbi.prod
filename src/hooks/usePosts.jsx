import { useMemo } from "react"

export function useSortedPosts(posts, sort) {
    const sortedPosts = useMemo(
        () => {
          if (sort) {
            return (
              [...posts].sort(
                (a, b) => 
                  a[sort].localeCompare(b[sort]))
            )
          } else {
            return posts
          }
        }, [sort,  posts]
    )
    return sortedPosts
}

export function usePosts(posts, sort, query) {
    const sortedPosts = useSortedPosts(posts, sort)
    const sortedAndSearchedPosts = useMemo(
        () =>
          sortedPosts.filter(
            post => 
              post.title
                .toLowerCase()
                .includes(query)
          ), 
          [query, sortedPosts]
    )
    return sortedAndSearchedPosts
}