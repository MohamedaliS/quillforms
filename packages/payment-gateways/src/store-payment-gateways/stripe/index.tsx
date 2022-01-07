/**
 * QuillForms Dependencies.
 */
import ConfigAPI from '@quillforms/config';

/**
 * WordPress Dependencies.
 */
import { addAction } from '@wordpress/hooks';

/**
 * Internal Dependencies.
 */
import { registerPaymentGatewayModule } from '../../api';
import CustomerRender from '../customer-render';
import Settings from '../settings';

addAction(
	'QuillForms.Admin.PluginsLoaded',
	'QuillForms/PaymentGateways/RegisterStoreModules',
	register
);
addAction(
	'QuillForms.RendererCore.Loaded',
	'QuillForms/PaymentGateways/RegisterStoreModules',
	register
);

function register() {
	const assetsDir = ConfigAPI.getPluginDirUrl() + 'assets/addons/stripe';

	registerPaymentGatewayModule( 'stripe', {
		name: 'Stripe',
		description: 'Accept payments through stripe gateway.',
		icon: `${ assetsDir }/icon.png`,
		active: false,
		settings: Settings,
		methods: {
			elements: {
				admin: {
					label: {
						icon: `${ assetsDir }/stripe-wordmark-blurple.svg`,
						text: 'Elements',
					},
				},
				customer: {
					label: {
						text: 'Elements !!!!',
					},
					render: CustomerRender,
				},
			},
			checkout: {
				admin: {
					label: {
						icon: `${ assetsDir }/stripe-wordmark-blurple.svg`,
						text: 'Checkout',
					},
				},
				customer: {
					label: {
						text: 'Checkout !!!!',
					},
					render: CustomerRender,
				},
			},
		},
	} );
}
