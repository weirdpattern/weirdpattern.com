import "../scss/main.scss";
import "../scss/themes/prism-ayu-light.scss";

import * as React from "react";
import Helmet from "react-helmet";

import { Index } from "elasticlunr";

import * as data from "../../content/data.json";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Search from "../components/Search";

import { copyToClipboard } from "../utils";
import { Query, SearchIndex } from "../interfaces";

const config = data as any;

/**
 * Layout props.
 * @typedef {Query<SearchIndex>} Props
 * @property {*} children the children function renderer.
 *
 * @private
 * @interface
 */
interface Props extends Query<SearchIndex> {}

/**
 * Header state.
 * @typedef {Interface} State
 * @property {boolean} searchIntent a flag indicating the user intents to search.
 * @property {Array<any>} results the results from the search.
 *
 * @private
 * @interface
 */
interface State {
  searchIntent: boolean;
  results: Array<any>;
}

/**
 * Layout of the site.
 * @param {Function} children the children.
 * @returns {React.ReactNode} the react node that represents the layout.
 *
 * @public
 * @function
 */
export default class Layout extends React.PureComponent<Props, State> {
  private index: any;

  /**
   * Class constructor.
   * @param {Props} props the properties of the layout.
   */
  public constructor(props: Props) {
    super(props);

    this.state = { searchIntent: false, results: [] };
    this.searchHandler = this.searchHandler.bind(this);
    this.keydownHandler = this.keydownHandler.bind(this);
  }

  /** @inheritdoc */
  public componentDidMount(): void {
    window.addEventListener("keydown", this.keydownHandler);

    Array.from(document.querySelectorAll(".gatsby-highlight")).forEach(
      (element: Element) => {
        const pre = element.querySelector("pre[class*='language-']");
        const language = pre.getAttribute("class").split("-")[1];

        const container = document.createElement("div");
        container.setAttribute("class", "code-header");

        const title = document.createElement("span");
        title.innerText =
          language.trim().toLowerCase() !== "text" ? language : "";

        const copy = document.createElement("div");
        copy.setAttribute("class", "copy");
        copy.addEventListener("click", () => {
          const text = pre.querySelector("code").innerText;
          copyToClipboard(text);

          copy.classList.add("success");
          setTimeout(() => {
            copy.classList.remove("success");
          }, 1000);
        });

        container.appendChild(title);
        container.appendChild(copy);

        pre.parentElement.insertBefore(container, pre);
      }
    );
  }

  /** @inheritdoc */
  public render(): React.ReactNode {
    const { children } = this.props;
    const { results } = this.state;

    return (
      <div className="container-fluid">
        <div className="page">
          <Helmet>
            <title>{config.title}</title>
            <meta name="description" content={config.description} />
          </Helmet>
          <div className="sidepanel">
            <Header
              title={config.title}
              description={config.description}
              name={config.profile.name}
              email={config.profile.email}
              credentials={config.profile.credentials}
              avatar={config.profile.avatar}
            />
            <Footer
              networks={config.profile.networks}
              copyright={config.copyright}
            />
          </div>
          <div className="mainpanel">
            <Search
              searchIntent={this.state.searchIntent}
              results={this.state.results}
              search={this.searchHandler}
            />
            {children()}
          </div>
        </div>
      </div>
    );
  }

  /**
   * Looks for search activation keys.
   * @param {React.KeyboardEvent<HTMLElement>} event the event.
   * @returns {void}
   *
   * @private
   * @method
   */
  private keydownHandler(event: KeyboardEvent): void {
    if (
      event.altKey &&
      event.shiftKey &&
      (event.key === "S" || event.keyCode === 83)
    ) {
      this.setState({ searchIntent: true });
    }
  }

  /**
   * Performs a search.
   * @param {string} term the term to be searched.
   * @returns {void}
   *
   * @private
   * @method
   */
  private searchHandler(term: string): void {
    this.index = this.index || Index.load(
      this.props.data.search.index
    );

    this.setState({
      results: this.index.search(term).map(
        ({ ref }: any) => this.index.documentStore.getDoc(ref)
      )
    });
  }
}

export const query = graphql`
  query SearchIndexQuery {
    search: siteSearchIndex {
      index
    }
  }
`;
