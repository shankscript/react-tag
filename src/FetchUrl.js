import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "./withRoot";
import {processHtml} from './util'

const styles = theme => ({
  root: {
    textAlign: "center",
    paddingTop: theme.spacing.unit * 20
  }
});

class FetchUrl extends React.Component {
  state = {
    rawHtml: "",
    loaded: true
  };

  tagNamesCount = {};
  url = `https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/`;
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.badgeClick = this.badgeClick.bind(this);
  }
  
  badgeClick = e => {
    e.persist();
    const cls = e.target.textContent;
    const tags = document.querySelector("#tags");
    tags.classList.contains(cls)
      ? tags.classList.remove(cls)
      : tags.classList.add(cls);
  };

  handleClick = () => {
    this.setState({ loaded: false }); // = false;
    axios
      .get("http://shankscript.me/fetchUrl.php?url=" + this.url)
      .then(res => {
        const rawHtml = res.data;
        try {
          window.r = rawHtml;
          let processedHtml = processHtml(res.data);
          document.querySelector("#style").innerHTML = processedHtml.styles;
          document.querySelector("#tags").innerHTML = `<h2>${/:\/\/(.*?)\//.exec(this.url)[1]}</h2>${processedHtml.html}`;
          this.tagNamesCount = processedHtml.tagNamesCount;
          this.setState({ rawHtml });
        } catch (e) {
          alert("oops try other url!");
        }
        this.setState({ loaded: true });
      })
      .catch(e => {
        this.setState({ loaded: true });
        alert(e);
      });
  };

  onChange = ({ target: { value } }) => {
    this.url = value;
  };

  componentDidMount() {}

  render() {
    const { classes } = this.props;
    return (
      <div classes="FetchUrl">
        <div class="input-head">
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleClick}
          >
            Go
          </Button>
          <TextField
            id="outlined-with-placeholder"
            label=""
            placeholder=""
            margin="normal"
            variant="outlined"
            inputProps={{ onChange: this.onChange }}
          />
        </div>
        <ul id="badges">
          {" "}
          {Object.keys(this.tagNamesCount).map(tag => (
            <Badge
              key={tag}
              color="primary"
              badgeContent={this.tagNamesCount[tag]}
              className={(classes.margin, tag.toLowerCase())}
            >
              <Button
                variant="contained"
                onClick={this.badgeClick}
                className={tag.toLowerCase()}
              >
                {tag}
              </Button>
            </Badge>
          ))}
        </ul>
        {!this.state.loaded && (
          <CircularProgress className={classes.progress} color="secondary" />
        )}
        <div id="tags" />
        <h2 class="raw">Raw html</h2>
        <pre>{this.state.rawHtml}</pre>
      </div>
    );
  }
}

FetchUrl.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(FetchUrl));
