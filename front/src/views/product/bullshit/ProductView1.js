/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Button
} from "shards-react";

import PageTitle from "../../components/common/PageTitle";

class BlogPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // First list of posts.
      PostsListOne: [
        {
          backgroundImage: require("../../images/content-management/3.jpeg"),
          category: "Technology",
          categoryTheme: "royal-blue",
          author: "Jimmy Jackson",
          authorAvatar: require("../../images/avatars/2.jpg"),
          title: "Producte",
          body:
            "Descripció producte xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
          date: "29 February 2019"
        }
      ]
    };
  }

  render() {
    const {
      PostsListOne,
    } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Producte" subtitle="Reutilització" className="text-sm-left" />
        </Row>

        {/* First Row of Posts */}
        <Row>
          {PostsListOne.map((post, idx) => (
              <Card style={{ maxWidth: "900px"}} className="card-post card-post--4">
                <div
                  className="card-post__image"
                  style={{ backgroundImage: `url(${post.backgroundImage})` }}
                >
                  <Badge
                    pill
                    className={`card-post__category bg-${post.categoryTheme}`}
                  >
                    {post.category}
                  </Badge>
                  <div className="card-post__author d-flex">
                    <a
                      href="#"
                      className="card-post__author-avatar card-post__author-avatar--big"
                      style={{ backgroundImage: `url('${post.authorAvatar}')` }}
                    >
                      
                    </a>
                  </div>
                </div>
                <CardBody>
                  <h5 className="card-title">
                      {post.title}
                  </h5>
                  <p className="card-text d-inline-block mb-3">{post.body}</p>
                  <span className="text-muted">{post.date}</span>
									<p className="card-text d-inline-block mb-3"> Written by {post.author}</p>
                </CardBody>
									
              </Card>
          ))}
        </Row>
      </Container>
    );
  }
}

export default BlogPosts;
