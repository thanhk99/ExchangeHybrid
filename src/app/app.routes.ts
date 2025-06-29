import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { Security } from './security/security.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DeviceManagement } from './device-management/device-management';
import { Assetpage } from './assetpage/assetpage';
import { FundingWallet } from './funding-wallet/funding-wallet';
import { MarketComponent } from './market/market.component';
import { FavouriteComponent } from './market/favourite/favourite.component';
import { CryptoComponent } from './market/crypto/crypto.component';
import { SpotComponent } from './market/spot/spot.component';
import { FuturesComponent } from './market/futures/futures.component';
import { OptionsComponent } from './market/options/options.component';
import { PreMarketComponent } from './market/pre-market/pre-market.component';
import { OkxIndexComponent } from './market/okx-index/okx-index.component';
import { TradeDataComponent } from './market/trade-data/trade-data.component';
import { ArbitrageDataComponent } from './market/arbitrage-data/arbitrage-data.component';



export const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'security', component: Security },
    { path: 'device-management', component: DeviceManagement },
    { path: 'assetpage', component: Assetpage },
    { path: 'funding-wallet', component: FundingWallet },
    { path: 'market', component: MarketComponent },
    { path: 'market/favourite', component: FavouriteComponent },
    { path: 'market/crypto', component: CryptoComponent },
    { path: 'market/spot', component: SpotComponent },
    { path: 'market/futures', component: FuturesComponent },
    { path: 'market/options', component: OptionsComponent },
    { path: 'market/pre-market', component: PreMarketComponent },
    { path: 'market/okx-index', component: OkxIndexComponent },
    { path: 'market/trade-data', component: TradeDataComponent },
    { path: 'market/arbitrage-data', component: ArbitrageDataComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

