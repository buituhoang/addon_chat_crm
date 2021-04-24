# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.
{
    'name': 'Addon Chat CRM',
    'version': '0.1',
    'summary': 'Addon Chat CRM',
    'sequence': -10,
    'description': """Addon Chat CRM""",
    'category': 'Productivity',
    'website': 'https://www.abcxyz.com/',
    'license': 'LGPL-3',
    'depends': ['crm', 'base'],
    'data': [
        'views/addon_chat_crm.xml',
        'views/templates.xml'
    ],
    'demo': [],
    'qweb': [],
    'installable': True,
    'application': True,
    'auto_install': False,
}
