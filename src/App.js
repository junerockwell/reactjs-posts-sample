import "./styles/App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFound from "./pages/notFound";
import PostsList from "./pages/postsList";
import PostDetails from "./pages/postDetails";
import Author from "./pages/author";

function App() {
  return (
    <div id="wrapper">
      <Router>
        <Switch>
          <Route exact path="/" component={PostsList} />
          <Route exact path="/details/:id" component={PostDetails} />
          <Route path="/details/:id/author/:userId" component={Author}/>
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
