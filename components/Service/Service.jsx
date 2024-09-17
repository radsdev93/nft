import React from 'react';

import Style from './Service.module.css'
import images from '../../img';
import Image from 'next/image';

function Service() {
  return (
    <div className={Style.service}>
        <div className={Style.service_box}>
            <div className={Style.service_box_item}>
                <Image src={images.service1} alt="Filter and Discover" width={100} height={100}/>
                <p className={Style.service_box_item_step}>
                    <span>Step 1</span>
                </p>
                <h3>Filter and Discover</h3>
                <p>
                    Connect with wallet, discover, buy NFTs, sell your NFTs and earn money
                </p>
            </div>

            <div className={Style.service_box_item}>
                <Image src={images.service2} alt="Filter and Discover" width={100} height={100}/>
                <p className={Style.service_box_item_step}>
                    <span>Step 2</span>
                </p>
                <h3>Connect Wallet</h3>
                <p>
                    Connect with wallet, discover, buy NFTs, sell your NFTs and earn money
                </p>
            </div>

            <div className={Style.service_box_item}>
                <Image src={images.service3} alt="Filter and Discover" width={100} height={100}/>
                <p className={Style.service_box_item_step}>
                    <span>Step 3</span>
                </p>
                <h3>Start trading</h3>
                <p>
                    Connect with wallet, discover, buy NFTs, sell your NFTs and earn money
                </p>
            </div>
        </div>
    </div>
  )
}

export default Service