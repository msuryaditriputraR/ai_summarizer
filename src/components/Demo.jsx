import { useState, useEffect } from "react";

import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
    const [article, setArticle] = useState({
        url: "",
        summary: "",
    });

    const [allArticles, setAllArticles] = useState([]);

    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

    useEffect(() => {
        const articlesFromLocalStorage = JSON.parse(
            localStorage.getItem("articles")
        );

        if (articlesFromLocalStorage) setAllArticles(articlesFromLocalStorage);
    });

    const handleSearch = async (e) => {
        e.preventDefault();

        const { data } = await getSummary({ articleUrl: article.url });

        if (data?.summary) {
            const newArticle = { ...article, summary: data.summary };
            const updatedAllArticles = [newArticle, ...allArticles];

            setArticle(newArticle);
            setAllArticles(updatedAllArticles);
        }
    };
    const handleChange = (e) => {
        setArticle({
            ...article,
            url: e.target.value,
        });
    };

    return (
        <section className="mt-16 w-full max-w-full">
            {/* Search */}

            <div className="flex w-full flex-col gap-2">
                <form
                    className="relative flex items-center justify-center"
                    onSubmit={handleSearch}
                >
                    <img
                        src={linkIcon}
                        alt=""
                        aria-hidden="true"
                        className="absolute left-0 my-2 ml-3 w-5"
                    />

                    <input
                        type="url"
                        placeholder="Enter a URL"
                        value={article.url}
                        onChange={handleChange}
                        required
                        className="url_input peer"
                    />

                    <button
                        type="submit"
                        className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
                    >
                        ↵
                    </button>
                </form>

                {/* Browse URL History */}
            </div>
            {/* Display Results */}
        </section>
    );
};

export default Demo;
