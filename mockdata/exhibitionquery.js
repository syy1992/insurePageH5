//参数应为类型
//展会险种方案查询

module.exports = {
    plans: [
        [{
                name: "100 ㎡ （含）以下",
                value: 1,
                price: {
                    name: '1000.00 元',
                    value: 1000
                },
                planDetails: [{
                        planTitle: "展览会责任险",
                        desc: "雇请工作人员责任、第三者责任、所租用展览场所的建筑物、各类设备及地面、地基的损失责任",
                        planItems: [{
                                title: "每人赔偿限额",
                                value: '100万',
                            },
                            {
                                title: "每次事故赔偿限额",
                                value: '100万',
                            },

                            {
                                title: "累计赔偿限额",
                                value: '100万',
                            },
                            {
                                title: "免赔额 ",
                                value: '每次事故损失金额的 200 元或 5%，两者以高者为准',
                            }, {
                                title: "投保方式",
                                value: "不记名投保"
                            }
                        ]
                    },
                    {
                        planTitle: "安装工程一切险",
                        desc: '',
                        planItems: [{
                                title: "物质损失部分赔偿限额",
                                value: "50 万"
                            },
                            {
                                title: "免赔额",
                                value: "每次事故损失金额的 1000 元或 5%，两者以高者为准"
                            }
                        ]
                    }
                ]
            },
            {
                name: "300 ㎡ （含）以下",
                value: 2,
                price: [{
                    key: 'A',
                    value: 'A 单层保费',
                    price: {
                        name: '2300.00 元 ',
                        value: 2300
                    }
                }, {
                    key: 'B',
                    value: 'B 双层保费',
                    price: {
                        name: '3000.00 元 ',
                        value: 3000
                    }
                }],
                planDetails: [{
                        planTitle: "展览会责任险",
                        desc: "雇请工作人员责任、第三者责任、所租用展览场所的建筑物、各类设备及地面、地基的损失责任",
                        planItems: [{
                                title: "每人赔偿限额",
                                value: '100万',
                            },
                            {
                                title: "每次事故赔偿限额",
                                value: '100万',
                            },

                            {
                                title: "累计赔偿限额",
                                value: '100万',
                            },
                            {
                                title: "免赔额 ",
                                value: '每次事故损失金额的 200 元或 5%，两者以高者为准',
                            }, {
                                title: "投保方式",
                                value: "不记名投保"
                            }
                        ]
                    },
                    {
                        planTitle: "安装工程一切险",
                        desc: '',
                        planItems: [{
                                title: "物质损失部分赔偿限额",
                                value: "80 万"
                            },
                            {
                                title: "免赔额",
                                value: "每次事故损失金额的 1000 元或 5%，两者以高者为准"
                            }
                        ]
                    }
                ]
            },
            {
                name: "301 ㎡--600 ㎡",
                value: 3,
                price: [{
                    key: 'A',
                    value: 'A 单层保费',
                    price: {
                        name: '3900.00 元 ',
                        value: 3900
                    }
                }, {
                    key: 'B',
                    value: 'B 双层保费',
                    price: {
                        name: '5100.00 元 ',
                        value: 5100
                    }
                }],
                planDetails: [{
                        planTitle: "展览会责任险",
                        desc: "雇请工作人员责任、第三者责任、所租用展览场所的建筑物、各类设备及地面、地基的损失责任",
                        planItems: [{
                                title: "每人赔偿限额",
                                value: '100万',
                            },
                            {
                                title: "每次事故赔偿限额",
                                value: '100万',
                            },

                            {
                                title: "累计赔偿限额",
                                value: '100万',
                            },
                            {
                                title: "免赔额 ",
                                value: '每次事故损失金额的 200 元或 5%，两者以高者为准',
                            }, {
                                title: "投保方式",
                                value: "不记名投保"
                            }
                        ]
                    },
                    {
                        planTitle: "安装工程一切险",
                        desc: '',
                        planItems: [{
                                title: "物质损失部分赔偿限额",
                                value: "80 万"
                            },
                            {
                                title: "免赔额",
                                value: "每次事故损失金额的 1000 元或 5%，两者以高者为准"
                            }
                        ]
                    }
                ]
            },
            {
                name: "601 ㎡--1100 ㎡",
                value: 4,
                price: [{
                    key: 'A',
                    value: 'A 单层保费',
                    price: {
                        name: '6500.00 元 ',
                        value: 6500
                    }
                }, {
                    key: 'B',
                    value: 'B 双层保费',
                    price: {
                        name: '8500.00 元 ',
                        value: 8500
                    }
                }],
                planDetails: [{
                        planTitle: "展览会责任险",
                        desc: "雇请工作人员责任、第三者责任、所租用展览场所的建筑物、各类设备及地面、地基的损失责任",
                        planItems: [{
                                title: "每人赔偿限额",
                                value: '100万',
                            },
                            {
                                title: "每次事故赔偿限额",
                                value: '100万',
                            },

                            {
                                title: "累计赔偿限额",
                                value: '100万',
                            },
                            {
                                title: "免赔额 ",
                                value: '每次事故损失金额的 200 元或 5%，两者以高者为准',
                            }, {
                                title: "投保方式",
                                value: "不记名投保"
                            }
                        ]
                    },
                    {
                        planTitle: "安装工程一切险",
                        desc: '',
                        planItems: [{
                                title: "物质损失部分赔偿限额",
                                value: "100 万"
                            },
                            {
                                title: "免赔额",
                                value: "每次事故损失金额的 1000 元或 5%，两者以高者为准"
                            }
                        ]
                    }
                ]
            },
            {
                name: "1101 ㎡--1600 ㎡",
                value: 5,
                price: [{
                    key: 'A',
                    value: 'A 单层保费',
                    price: {
                        name: '8500.00 元 ',
                        value: 8500
                    }
                }, {
                    key: 'B',
                    value: 'B 双层保费',
                    price: {
                        name: '11000.00 元 ',
                        value: 11000
                    }
                }],
                planDetails: [{
                        planTitle: "展览会责任险",
                        desc: "雇请工作人员责任、第三者责任、所租用展览场所的建筑物、各类设备及地面、地基的损失责任",
                        planItems: [{
                                title: "每人赔偿限额",
                                value: '100万',
                            },
                            {
                                title: "每次事故赔偿限额",
                                value: '100万',
                            },

                            {
                                title: "累计赔偿限额",
                                value: '100万',
                            },
                            {
                                title: "免赔额 ",
                                value: '每次事故损失金额的 200 元或 5%，两者以高者为准',
                            }, {
                                title: "投保方式",
                                value: "不记名投保"
                            }
                        ]
                    },
                    {
                        planTitle: "安装工程一切险",
                        desc: '',
                        planItems: [{
                                title: "物质损失部分赔偿限额",
                                value: "100 万"
                            },
                            {
                                title: "免赔额",
                                value: "每次事故损失金额的 1000 元或 5%，两者以高者为准"
                            }
                        ]
                    }
                ]
            },
            {
                name: "1601 ㎡--2100 ㎡",
                value: 6,
                price: [{
                    key: 'A',
                    value: 'A 单层保费',
                    price: {
                        name: '13000.00 元 ',
                        value: 13000
                    }
                }, {
                    key: 'B',
                    value: 'B 双层保费',
                    price: {
                        name: '17000.00 元 ',
                        value: 17000
                    }
                }],
                planDetails: [{
                        planTitle: "展览会责任险",
                        desc: "雇请工作人员责任、第三者责任、所租用展览场所的建筑物、各类设备及地面、地基的损失责任",
                        planItems: [{
                                title: "每人赔偿限额",
                                value: '100万',
                            },
                            {
                                title: "每次事故赔偿限额",
                                value: '100万',
                            },

                            {
                                title: "累计赔偿限额",
                                value: '100万',
                            },
                            {
                                title: "免赔额 ",
                                value: '每次事故损失金额的 200 元或 5%，两者以高者为准',
                            }, {
                                title: "投保方式",
                                value: "不记名投保"
                            }
                        ]
                    },
                    {
                        planTitle: "安装工程一切险",
                        desc: '',
                        planItems: [{
                                title: "物质损失部分赔偿限额",
                                value: "300 万"
                            },
                            {
                                title: "免赔额",
                                value: "每次事故损失金额的 1000 元或 5%，两者以高者为准"
                            }
                        ]
                    }
                ]
            },
            {
                name: "2101 ㎡ --2600 ㎡及以上",
                value: 7,
                price: [{
                    key: 'A',
                    value: 'A 单层保费',
                    price: {
                        name: '15000.00 元 ',
                        value: 15000
                    }
                }, {
                    key: 'B',
                    value: 'B 双层保费',
                    price: {
                        name: '20000.00 元 ',
                        value: 20000
                    }
                }],
                planDetails: [{
                        planTitle: "展览会责任险",
                        desc: "雇请工作人员责任、第三者责任、所租用展览场所的建筑物、各类设备及地面、地基的损失责任",
                        planItems: [{
                                title: "每人赔偿限额",
                                value: '150万',
                            },
                            {
                                title: "每次事故赔偿限额",
                                value: '150万',
                            },

                            {
                                title: "累计赔偿限额",
                                value: '150万',
                            },
                            {
                                title: "免赔额 ",
                                value: '每次事故损失金额的 200 元或 5%，两者以高者为准',
                            }, {
                                title: "投保方式",
                                value: "不记名投保"
                            }
                        ]
                    },
                    {
                        planTitle: "安装工程一切险",
                        desc: '',
                        planItems: [{
                                title: "物质损失部分赔偿限额",
                                value: "400 万"
                            },
                            {
                                title: "免赔额",
                                value: "每次事故损失金额的 1000 元或 5%，两者以高者为准"
                            }
                        ]
                    }
                ]
            },
            {
                name: "2601 ㎡ --3100 ㎡及以上",
                value: 8,
                price: [{
                    key: 'A',
                    value: 'A 单层保费',
                    price: {
                        name: '19000.00 元 ',
                        value: 19000
                    }
                }, {
                    key: 'B',
                    value: 'B 双层保费',
                    price: {
                        name: '25000.00 元 ',
                        value: 25000
                    }
                }],
                planDetails: [{
                        planTitle: "展览会责任险",
                        desc: "雇请工作人员责任、第三者责任、所租用展览场所的建筑物、各类设备及地面、地基的损失责任",
                        planItems: [{
                                title: "每人赔偿限额",
                                value: '150万',
                            },
                            {
                                title: "每次事故赔偿限额",
                                value: '150万',
                            },

                            {
                                title: "累计赔偿限额",
                                value: '150万',
                            },
                            {
                                title: "免赔额 ",
                                value: '每次事故损失金额的 200 元或 5%，两者以高者为准',
                            }, {
                                title: "投保方式",
                                value: "不记名投保"
                            }
                        ]
                    },
                    {
                        planTitle: "安装工程一切险",
                        desc: '',
                        planItems: [{
                                title: "物质损失部分赔偿限额",
                                value: "400 万"
                            },
                            {
                                title: "免赔额",
                                value: "每次事故损失金额的 1000 元或 5%，两者以高者为准"
                            }
                        ]
                    }
                ]
            },
            {
                name: "3101 ㎡及以上",
                value: 9,
                price: [{
                    key: 'A',
                    value: 'A 单层保费',
                    price: {
                        name: '25000.00 元 ',
                        value: 25000
                    }
                }, {
                    key: 'B',
                    value: 'B 双层保费',
                    price: {
                        name: '30000.00 元 ',
                        value: 30000
                    }
                }],
                planDetails: [{
                        planTitle: "展览会责任险",
                        desc: "雇请工作人员责任、第三者责任、所租用展览场所的建筑物、各类设备及地面、地基的损失责任",
                        planItems: [{
                                title: "每人赔偿限额",
                                value: '150万',
                            },
                            {
                                title: "每次事故赔偿限额",
                                value: '150万',
                            },

                            {
                                title: "累计赔偿限额",
                                value: '150万',
                            },
                            {
                                title: "免赔额 ",
                                value: '每次事故损失金额的 200 元或 5%，两者以高者为准',
                            }, {
                                title: "投保方式",
                                value: "不记名投保"
                            }
                        ]
                    },
                    {
                        planTitle: "安装工程一切险",
                        desc: '',
                        planItems: [{
                                title: "物质损失部分赔偿限额",
                                value: "400 万"
                            },
                            {
                                title: "免赔额",
                                value: "每次事故损失金额的 1000 元或 5%，两者以高者为准"
                            }
                        ]
                    }
                ]
            }

        ]
    ]
}