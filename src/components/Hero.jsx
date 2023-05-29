import { logo } from "../assets";

const Hero = () => {
    return (
        <header className="flex w-full flex-col items-center justify-center">
            <nav className="mb-10 flex w-full items-center justify-between pt-3">
                <img
                    src={logo}
                    alt="sumz logo"
                    className="w-28 object-contain"
                />

                <button
                    type="button"
                    onClick={() =>
                        window.open("https://github.com/msuryaditriputraR")
                    }
                    className="black_btn"
                >
                    Github
                </button>
            </nav>

            <h1 className="head_text">
                Summarize Articles with <br className="max-md:hidden" />
                <span className="orange_gradient"> OpenAi GPT-4</span>
            </h1>
            <h2 className="desc">
                Simplify your reading with Summize, an open-source article
                summarizer that transforms lengthy articles into clear and
                concise summaries
            </h2>
        </header>
    );
};

export default Hero;
