import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

class FetchUrl extends React.Component {
  state = {
    rawHtml: '',
    loaded: true
  }

  tagNamesCount = {};
  url = `https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/`;
  constructor (props) {
    super(props);
    console.log(props);
    this.handleClick = this.handleClick.bind(this);
    this.onChange = this.onChange.bind(this);
  this.badgeClick = this.badgeClick.bind(this);
  }
  processHtml = (html) => {
    let tags = html.match(/<([^/].*?)>/gi);
    let tagNames = tags.map(m=>  m.length < 250 && /<([^\s^>]*)>?/.exec(m)[1]);
    let tagNamesCount = {};
    tagNames.forEach(m =>  {
      tagNamesCount[m] = tagNamesCount[m] || 0;
      tagNamesCount[m]++;
    });
    this.tagNamesCount = tagNamesCount;
    let styles = '';
    Object.keys(tagNamesCount).forEach(m=> {
      styles += '.' + m + ' .' + m +'{';
      let color = (Math.random()*0xFFFFFF<<0).toString(16);
      if(color.length < 6) color += '1';
      styles += `
        background: #${color};
      `;
      styles += '}'
    });


    html = html.replace(/[\"\']/gi,'')
    .replace(/<(.*?)>/gi, `<span class="tag $1"> < $1 ></span><span class="space"> </span>`)
    .replace(/<span class="tag (.*?)"/ig, (match, contents, offset, input_string) => {
      return '<span class="tag '  + /([^\s^>]*)?/.exec(contents)[1] + '"';
      //return match;
    });
    return {html, styles};
  } 
  badgeClick = (e) => {
    e.persist();
    const cls = e.target.textContent;
    // console.log(e.target.textContent);
    const tags = document.querySelector('#tags');
    tags.classList.contains(cls) ? tags.classList.remove(cls) : tags.classList.add(cls);  
  }

  handleClick = () => {
    this.setState({loaded: false});// = false;
    axios.get('http://shankscript.me/fetchUrl.php?url=' + this.url)
      .then(res => {
        const rawHtml = res.data;
        try{
        window.r = rawHtml;
        let processedHtml = this.processHtml(res.data);
        document.querySelector("#style").innerHTML = processedHtml.styles;
        document.querySelector('#tags').innerHTML = processedHtml.html;
        this.setState({ rawHtml });
        } catch(e) {
          alert('oops try other url!');
        }
        this.setState({loaded: true});
      })
      .catch(e=> {
        this.setState({loaded: true});
        alert(e);
      });
  };

  onChange = ({target:{value}}) => {
    this.url = value;
  };

  componentDidMount() {
    
  }

  render() {
     const { classes } = this.props;
    return (
      <div>
      <div class="input-head">
        <Button variant="contained" color="secondary" onClick={this.handleClick}>Go</Button>
        <TextField
        id="outlined-with-placeholder"
        label=""
        placeholder=""
        margin="normal"
        variant="outlined"
        inputProps={{onChange: this.onChange}}
        />
        </div>
        <ul id="badges"> {
          Object.keys(this.tagNamesCount).map(tag=> (
            <Badge key={tag} color="primary" badgeContent={this.tagNamesCount[tag]} className={classes.margin, tag.toLowerCase()}>
              <Button variant="contained" onClick={this.badgeClick} className={tag.toLowerCase()}>{tag}</Button>
            </Badge>
            ))
        }
        </ul>
        {!this.state.loaded &&  (<CircularProgress className={classes.progress} color="secondary" />)  }
        <div id="tags"></div>
        <div>{this.state.rawHtml}</div>
      </div>
    );
  }
}


FetchUrl.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(FetchUrl));

