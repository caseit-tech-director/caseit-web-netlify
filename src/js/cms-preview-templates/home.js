import React from "react";
import format from "date-fns/format";

import Jumbotron from "./components/jumbotron";

export default class PostPreview extends React.Component {
  render() {
    const { entry, getAsset } = this.props;
    let image = getAsset(entry.getIn(["data", "image"]));

    // Bit of a nasty hack to make relative paths work as expected as a background image here
    if (image && !image.fileObj) {
      image =
        window.parent.location.protocol +
        "//" +
        window.parent.location.host +
        image;
    }

    return (
      <div>
        <header className="hero">
          <div className="hero__blurb full-width">
            <h1 className="display">{entry.getIn(["data", "title"])}</h1>
            <p className="h4 h4--accented">
              {entry.getIn(["data", "subtitle"])}
            </p>
          </div>
        </header>

        <main>
          <div className="content-block">
            <section className="grid-2-cols full-width">
              <div className="grid-2-cols__image-left">
                <img
                  className="image--bleed-left"
                  src="{ entry.getIn(['data', 'pitch1', 'imageUrl'])}"
                />
              </div>
              <div className="grid-2-cols__blurb-right">
                <h2>{entry.getIn(["data", "pitch1", "heading"])}</h2>
                <p>{entry.getIn(["data", "pitch1", "text"])}</p>
                <a href="#" className="button-primary">
                  {entry.getIn(["data", "pitch1", "ctaText"])}
                </a>
              </div>
            </section>
          </div>

          <section className="grid-2-cols full-width content-block">
            <div className="grid-2-cols__blurb-left">
              <h2>{entry.getIn(["data", "pitch2", "heading"])}</h2>
              <p>{entry.getIn(["data", "pitch2", "text"])}</p>
              <a href="#" className="button-primary">
                {entry.getIn(["data", "pitch2", "ctaText"])}
              </a>
            </div>
            <div className="grid-2-cols__image-right">
              <img
                className="image--bleed-right"
                src="{ entry.getIn(['data', 'pitch2', 'imageUrl'])}"
              />
            </div>
          </section>

          <section id="caseitGoingOnline" className="content-block">
            <div className="center-text">
              <h2>{entry.getIn(["data", "caseitGoingOnline", "heading"])}</h2>
              <p>{entry.getIn(["data", "caseitGoingOnline", "text"])}</p>
              <a href="#" className="button-primary button-primary--inverted">
                {entry.getIn(["data", "caseitGoingOnline", "cta"])}
              </a>
            </div>

            <div className="center-graphic-container">
              <img src="img/globe-line-art.svg" alt="Globe line art" />
              <div className="center-graphic-container__gradient"></div>
            </div>

            <div className="grid-3-cols full-width going-online-info">
              {entry
                .getIn(["data", "caseitGoingOnline", "resources"])
                .map((current) => (
                  <a className="info-card" href="#">
                    <h3 className="h4 h4--accented">{current.heading}</h3>
                    <p>{current.text}</p>
                  </a>
                ))}
            </div>
          </section>

          <section id="caseit2020">
            <div className="center-text">
              <h2>{entry.getIn(["data", "caseit2020", "heading"])}</h2>
              <p>{entry.getIn(["data", "caseit2020", "text"])}</p>
            </div>
          </section>

          <section className="content-block">
            <div id="sponsors" className="grid-2-cols full-width">
              <div className="grid-2-cols__blurb-left">
                <h2>{entry.getIn(["data", "sponsors", "heading"])}</h2>
                <p>{entry.getIn(["data", "sponsors", "text"])}</p>
                <a href="#" className="button-primary">
                  {entry.getIn(["data", "sponsors", "ctaText"])}
                </a>
              </div>
              <div className="grid-2-cols__image-right">
                <img
                  className="image--bleed-left"
                  src="{entry.getIn(['data', 'sponsors', 'imageUrl'])}"
                />
              </div>
            </div>
          </section>

          <section className="content-block">
            <div id="sponsors" className="grid-2-cols full-width">
              <div className="grid-2-cols__image-left">
                <img
                  className="image--bleed-left"
                  src="{{entry.getIn(['data', 'endingCtaBlock', 'imageUrl'])}}"
                />
              </div>
              <div className="grid-2-cols__blurb-right">
                <h2>{entry.getIn(["data", "endingCtaBlock", "heading"])}</h2>
                <p>{entry.getIn(["data", "endingCtaBlock", "text"])}</p>
                <div className="form-controls">
                  <a href="#" className="button-primary">
                    {entry.getIn(["data", "endingCtaBlock", "ctaTextStudent"])}
                  </a>
                  <a href="#" className="button-secondary">
                    {entry.getIn(["data", "endingCtaBlock", "ctaTextCoach"])}
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}
