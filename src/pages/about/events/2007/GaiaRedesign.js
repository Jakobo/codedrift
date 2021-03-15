import { A, P } from "src/components/markup";
import { Entry } from "src/components/Timeline";
import React from "react";

export default function GaiaRedesign() {
  return (
    <Entry
      year="2007"
      title="Software Engineer, Gaia Online"
      product="Gaia Online Redesign"
      href="https://web.archive.org/web/20071010221551/http://yuiblog.com/blog/2007/09/25/gaia/"
      categories={["Featured", "Engineering"]}
    >
      <P>
        From the top down, this was the first ever redeisgn of the Gaia Online
        site since its intial launch. Having accumulated several years of
        organic growth, the site needed a new navigational taxonomy that
        continued to push the boundries of a browser based MMORPG. Art
        constraints required a use of pixel-based grids, while the rebuilt of
        the Interactive Map was featured on the YUI Blog.
      </P>
      <P>
        In partnership with{" "}
        <A href="http://www.blueflavor.com/our-work/gaia-online/index.html">
          Blue Flavor
        </A>
      </P>
    </Entry>
  );
}
