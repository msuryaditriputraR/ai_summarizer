import { useState, useEffect } from "react";

import { copy, linkIcon, loader, tick, trash } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
    const [article, setArticle] = useState({
        url: "",
        summary: "",
    });

    const [allArticles, setAllArticles] = useState([]);
    const [copied, setCopied] = useState("");

    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

    useEffect(() => {
        const articlesFromLocalStorage = JSON.parse(
            localStorage.getItem("articles")
        );

        if (articlesFromLocalStorage) setAllArticles(articlesFromLocalStorage);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data } = await getSummary({ articleUrl: article.url });

        if (data?.summary) {
            const newArticle = { ...article, summary: data.summary };

            const noDuplicateUrl = allArticles.filter(
                (a) => a.url !== article.url
            );
            const updatedAllArticles = [newArticle, ...noDuplicateUrl];

            setArticle(newArticle);
            setAllArticles(updatedAllArticles);

            updateStorage(updatedAllArticles);
        }
    };
    const handleChange = (e) => {
        setArticle({
            ...article,
            url: e.target.value,
        });
    };

    const handleCopy = (copyUrl) => {
        setCopied(copyUrl);
        navigator.clipboard.writeText(copyUrl);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDelete = (e, itemUrl) => {
        e.stopPropagation();
        const updatedAllArticles = allArticles.filter(
            (article) => article.url !== itemUrl
        );

        setAllArticles(updatedAllArticles);
        updateStorage(updatedAllArticles);
    };

    const updateStorage = (updatedAllArticles) => {
        localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    };

    return (
        <section className="mt-16 w-full max-w-full md:w-5/6 lg:w-3/4">
            {/* Search */}

            <div className="flex w-full flex-col gap-2">
                <form
                    className="relative flex items-center justify-center"
                    onSubmit={handleSubmit}
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
                        aria-label="Get Summary"
                    >
                        ↵
                    </button>
                </form>

                {/* Browse URL History */}
                <div className="flex max-h-60 flex-col gap-1 overflow-y-auto">
                    {allArticles.map((item, index) => (
                        <div
                            key={`link-${index}`}
                            onClick={() => setArticle(item)}
                            className="link_card"
                        >
                            <p className="flex-1 truncate font-satoshi text-sm font-medium text-blue-700">
                                {item.url}
                            </p>
                            <div
                                className="flex items-center justify-center"
                                onClick={(e) => handleDelete(e, item.url)}
                            >
                                <img
                                    src={trash}
                                    alt="delete"
                                    className="h-[40%] w-[40%] object-contain"
                                />
                            </div>
                            <div
                                className="copy_btn"
                                onClick={() => handleCopy(item.url)}
                            >
                                <img
                                    src={copied === item.url ? tick : copy}
                                    alt="copy"
                                    className="h-[40%] w-[40%] object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Display Results */}
            <div className="my-10 flex max-w-full items-center justify-center">
                {isFetching ? (
                    <img
                        src={loader}
                        alt=""
                        className="h-20 w-20 object-contain"
                    />
                ) : error ? (
                    <p className="text-center font-inter font-bold text-black">
                        Well, that wasnt supposed to happen...
                        <br />
                        <span className="font-satoshi font-normal text-gray-700">
                            {error?.data?.error}
                        </span>
                    </p>
                ) : (
                    article.summary && (
                        <div className="flex flex-col gap-3">
                            <h2 className="font-satoshi text-xl font-bold text-gray-600">
                                Article{" "}
                                <span className="blue_gradient">Summary</span>
                            </h2>

                            <div className="summary_box">
                                <p className="font-inter text-sm font-medium text-gray-700">
                                    {article.summary}
                                </p>
                            </div>
                        </div>
                    )
                )}
            </div>
        </section>
    );
};

export default Demo;
