// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import * as cheerio from "cheerio";
import type { NextApiRequest, NextApiResponse } from "next";
import { ProductType } from "../../types/product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductType[]>
) {
  const productList: ProductType[] = [];
  try {
    const res = await axios.get("https://partakefoods.com/collections/all");
    const pageHtml = res.data;
    const $ = cheerio.load(pageHtml);

    $(".collection-view-wrap").each((i, elm) => {
      /* const id =
        $(elm).find(".details > div").attr("data-bv-product-id") ||
        `${Date.now() + i}`; */
      const image =
        $(elm).find("img").attr("data-src") ||
        $(elm).find("img").attr("data-srcset") ||
        $(elm).find("img").attr("src");
      const tag = $(elm).find(".tag-is-bestseller").text();
      const title = $(elm).find("h4").text();
      const price = $(elm).find(".reg-price").text();
      const rating = $(elm).find(".bv_text").text();
      const priceMatches = price.match(/\d+/);
      productList.push({
        id: title,
        image: `https:${image}`.replace('{width}', '320') || 'https://cdn.shopify.com/s/files/1/0012/2296/7353/products/crunchyvarietypackcopy_360x.png?v=1606858800',
        tag: !!tag ? "BEST SELLER" : undefined,
        title,
        price: priceMatches ? parseFloat(priceMatches[0]) : 99,
        // rating,
      });
    });
  } catch (err) {
    console.error(err);
  }

  res.status(200).json(productList);
}
