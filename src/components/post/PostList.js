import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import { Query } from "react-apollo";
import { ACTIVE_TAGS_LQUERY } from "../../localState/localQueries";
import { GET_POSTS_BY_TAGS_QUERY } from "../../queries/PostQueries";
import Masonry from "./Masonry";
import Post from "./Post";

let brakePoints = [];
// let brakePoints = [ 510, 780, 1020, 1275, 1540 ];

const styles = theme => {
  for (let i = 1; i < 20; i++) {
    let gap = i * 2 * theme.postList.masonryGap;
    let width = (i + 1) * theme.postList.masonryItemWidth;
    brakePoints.push(gap + width);
  }
  return {
    circularProgress: {
      color: theme.palette.secondary.main
    }
  };
};

const PostList = ({ classes }) => (
  <Query query={ACTIVE_TAGS_LQUERY}>
    {({ data, loading }) => {
      if (loading)
        return (
          <CircularProgress
            className={classes.circularProgress}
            color="secondary"
          />
        );
      const { tags } = data.activeTags;
      return (
        <Query
          query={GET_POSTS_BY_TAGS_QUERY}
          fetchPolicy="network-only"
          variables={{ tagIds: tags }}
        >
          {({ data, error, loading }) => {
            if (error) return <p>Error</p>;
            if (loading)
              return <CircularProgress className={classes.circularProgress} />;
            return (
              <Masonry brakePoints={brakePoints}>
                {data.postsByTags.map(post => {
                  return (
                    <Post
                      key={post.id}
                      postId={post.id}
                      image={post.image}
                      title={post.title}
                      link={post.link}
                      description={post.description}
                      thumbnailType="img"
                    />
                  );
                })}
              </Masonry>
            );
            // {/* This is post list
            // <Post image="https://picsum.photos/200/300/?random" thumbnailType="img" /> */}
          }}
        </Query>
      );
    }}
  </Query>
);

export default withStyles(styles)(PostList);
