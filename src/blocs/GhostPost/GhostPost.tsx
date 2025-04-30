import React, { useEffect, useState } from "react";
import GhostContentAPI, { GhostContentAPIOptions, PostsOrPages } from '@tryghost/content-api'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Image from 'next/image';
import { ArrowRightIcon } from "@heroicons/react/24/solid";

const responsive = {
    0: {
        items: 1
    },
    568: {
        items: 1
    },
    990: {
        items: 2,
        itemsFit: 'fill'
    },
    1400: {
        items: 3
    },
    1900 : {
        items: 4
    },
    3000: {
        items: 5
    }
};

function ShortText(text: string, maxLength: number) {
    let ret = text;
    if (ret.length > maxLength) {
        ret = ret.substring(0, maxLength - 3) + "...";
    }
    return ret;
}

/**
 * @prop {GhostContentAPIOptions} GhostContentAPIOptions - The options for the Ghost Content API
 * @prop {number} [CardHeight=550]- The height of the card in pixels
 */
export interface GhostPostProps {
    GhostContentAPIOptions: GhostContentAPIOptions

    CardHeight?: number

}

const GhostPost = (props: GhostPostProps) => {

    props = { ...props }; // copy to avoid modifying the original object

    props.CardHeight = props.CardHeight || 600; // default value

    let height_class = `height: ${props.CardHeight}px;`;

    const [posts, setposts] = useState<React.JSX.Element[]>([])

    const api = new GhostContentAPI(props.GhostContentAPIOptions);

    useEffect(() => {
        api.posts
        .browse({ limit: 20, include: ['tags', "authors"] })
        .then((posts) => {
            posts.forEach((post) => {
                console.log(post.title);
            });
            let elements = posts.map((post, id) =>
                <div key={id}
                    style={
                      {
                        height: props.CardHeight
                      }
                    } 
                    className={`max-w-md mb-4 md:ml-16 rounded overflow-hidden shadow-lg select-none flex flex-col`}
                  >
                    <Image width={448} height={250} className="w-full pointer-events-none h-[250px] object-cover" src={post.feature_image ?? "https://assets.lameduse.net/logo/lameduse_logo_grad.webp"} alt={post.feature_image_alt ?? "no image"} />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{post.title}</div>
                        <p className="text-gray-700 text-base">
                            {ShortText(post.excerpt ?? "", 180)}
                        </p>
                    </div>
                    <div className="px-6 pt-4 pb-2 mt-auto mb-2">
                        <div>
                            {post.tags?.map((tag, id) =>
                                <span key={id} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{tag.name}</span>
                            )}
                        </div>
                        <div className="flex flex-row items-center">
                        <Image width={40} height={40} className="w-10 h-10 rounded-full" src={post.primary_author?.profile_image ?? "https://assets.lameduse.net/logo/lameduse_logo_grad.webp"} alt={post.primary_author?.name ?? "no image"} />
                            <a className="inline-block text-lameduse-primary hover:underline hover:underline-offset-2 rounded-full px-3 py-1 text-sm  mr-2 " href={post.primary_author?.url ?? ""}>{post.primary_author?.name ?? "no name"}</a>
                            <a className="inline-block text-lameduse-primary hover:underline hover:underline-offset-2 rounded-full px-3 py-1 text-sm ml-auto mr-2" href={post.url}>Read More <ArrowRightIcon className="h-6 w-6 inline-block"/></a>
                        </div>
                    </div>
                </div>
     
            )
            setposts(elements);
        })
        .catch((err) => {
            console.error(err);
        });
    }, [api.posts])
    return (
        <div>
            <div className="flex flex-row items-center justify-center py-16">
                <h1 className="text-4xl font-bold text-lameduse-primary">Blog</h1>
            </div>
            <div>
                <AliceCarousel
                    responsive={responsive}
                    mouseTracking
                    items={posts}
                />
            </div>
        </div>
    )
};

export default GhostPost;