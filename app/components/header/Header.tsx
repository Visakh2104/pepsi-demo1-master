import next from "next";
import Image from "next/image";
import Link from "next/link";
import './header.css'

export default function Header() {
    return (
        <header className="header">
            <div className="top-header">
                <div className="container">
                    <ul>
                        <li>Pepsi home delivery</li>
                        <li>Champaign - Urbana - Savoy</li>
                    </ul>
                </div>
            </div>
            <div className="main-header">
                <div className="container">
                    <div className="head-logo">
                        <Link href="/">
                            <Image
                                src={'/images/icons/header-logo.svg'}
                                alt={'Pepsi Logo'}
                                width={70}
                                height={70}
                                sizes="(max-width: 768px) 80vw, 25vw"
                                style={{ objectFit: "contain" }}
                            />
                        </Link>
                    </div>
                    <div className="menu-items">
                        <ul>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/products">Products</Link></li>
                            <li><Link href="/delivery">Delivery/Pick up</Link></li>
                            <li><Link href="">Contact</Link></li>
                            <li><Link href="">About</Link></li>
                        </ul>
                    </div>
                    <div className="social-icons">
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
        </header>
    );
}
