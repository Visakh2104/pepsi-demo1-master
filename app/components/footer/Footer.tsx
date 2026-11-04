import Image from "next/image";
import Link from "next/link";
import "./footer.css";

export default function Footer() {
    return (
        <footer
            style={{
                width: "100%",
                background: "#000",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                padding: "70px 0 60px",
            }}>

            <div className="container">
                <div className="foot-logo">
                    <Image
                        src={'/images/icons/header-logo.svg'}
                        alt={'Pepsi Logo'}
                        width={114}
                        height={114}
                        sizes="(max-width: 768px) 80vw, 25vw"
                        style={{ objectFit: "contain" }} />
                </div>
                <div className="nav-items">
                    <div className="nav-item-col1">
                        <h4>Quick Links</h4>

                        <ul>
                            <li><a href="">Home</a></li>
                            <li><a href="">Contact</a></li>
                            <li><a href="">About us</a></li>
                        </ul>

                    </div>
                    <div className="nav-item-col1">
                        <h4>Policy</h4>

                        <ul>
                            <li><a href="">Privacy</a></li>
                            <li><a href="">Terms of use</a></li>
                            <li><a href="">Refund and returns policy</a></li>
                        </ul>

                    </div>

                    <div className="nav-item-col1">
                        <h4>Social</h4>

                        <ul>
                            <li>
                                <Link href="">
                                    <Image
                                        src={'/images/icons/search-icon.svg'}
                                        alt={'Pepsi Logo'}
                                        width={19}
                                        height={19}
                                        sizes="(max-width: 768px) 80vw, 25vw"
                                        style={{ objectFit: "contain" }}
                                    />
                                </Link>
                            </li>
                            <li>
                                <Link href="">
                                    <Image
                                        src={'/images/icons/cart-icon.svg'}
                                        alt={'Pepsi Logo'}
                                        width={19}
                                        height={19}
                                        sizes="(max-width: 768px) 80vw, 25vw"
                                        style={{ objectFit: "contain" }}
                                    />
                                </Link>
                            </li>
                            <li>
                                <Link href="">
                                    <Image
                                        src={'/images/icons/fb-icon.svg'}
                                        alt={'Pepsi Logo'}
                                        width={19}
                                        height={19}
                                        sizes="(max-width: 768px) 80vw, 25vw"
                                        style={{ objectFit: "contain" }}
                                    />
                                </Link>
                            </li>
                            <li>
                                <Link href="">
                                    <Image
                                        src={'/images/icons/insta-icon.svg'}
                                        alt={'Pepsi Logo'}
                                        width={19}
                                        height={19}
                                        sizes="(max-width: 768px) 80vw, 25vw"
                                        style={{ objectFit: "contain" }}
                                    />
                                </Link>
                            </li>
                        </ul>

                    </div>

                </div>
            </div>

        </footer>
    );
}
