import office01 from "@/assets/office/office-01.png.asset.json";
import office02 from "@/assets/office/office-02.png.asset.json";
import office03 from "@/assets/office/office-03.png.asset.json";
import office04 from "@/assets/office/office-04.png.asset.json";
import office05 from "@/assets/office/office-05.png.asset.json";
import office06 from "@/assets/office/office-06.png.asset.json";

type Tile = {
  url: string;
  alt: string;
  caption: string;
  span: "tall" | "wide" | "regular";
  position?: string;
};

const TILES: Tile[] = [
  {
    url: office03.url,
    alt: "VEVRA leadership and team at the Kuruli corporate office boardroom",
    caption: "Leadership & core team",
    span: "wide",
  },
  {
    url: office05.url,
    alt: "VEVRA team outside the corporate office entrance",
    caption: "Corporate office, Kuruli",
    span: "tall",
  },
  {
    url: office04.url,
    alt: "VEVRA team in a working review session",
    caption: "Customer review sessions",
    span: "regular",
    position: "center 25%",
  },
  {
    url: office02.url,
    alt: "VEVRA engineering and operations desks at work",
    caption: "Engineering & operations floor",
    span: "regular",
  },
  {
    url: office06.url,
    alt: "VEVRA team assembled at the office entrance steps",
    caption: "One team, one promise",
    span: "wide",
  },
  {
    url: office01.url,
    alt: "VEVRA colleagues working together in the office lounge",
    caption: "Everyday collaboration",
    span: "tall",
  },
];

export function OfficeCollageWall() {
  return (
    <div className="office-wall">
      <div className="office-wall-grid">
        {TILES.map((tile, index) => (
          <figure key={tile.url} className="office-tile" data-span={tile.span}>
            <img
              src={tile.url}
              alt={tile.alt}
              loading="lazy"
              decoding="async"
              className="office-tile-image"
              style={{ objectPosition: tile.position }}
            />
            <span className="office-tile-veil" aria-hidden="true" />
            <figcaption className="office-tile-caption">
              <span className="office-tile-index">{String(index + 1).padStart(2, "0")}</span>
              {tile.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
