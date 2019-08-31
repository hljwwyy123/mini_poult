<template>
    <div class="form-id-box">
        <form class="record-formid" report-submit date-type="submit" @submit="recordFormId($event)">
            <button form-type="submit">
                <div class="btn-box" >
                    <form class="record-formid" report-submit date-type="submit" @submit="recordFormId($event)">
                        <button form-type="submit">
                            <div class="btn-box" >
                                <form class="record-formid" report-submit date-type="submit" @submit="recordFormId($event)">
                                    <button form-type="submit">
                                        <div class="btn-box" >
                                            <form class="record-formid" report-submit date-type="submit" @submit="recordFormId($event)">
                                                <button form-type="submit">
                                                    <div class="btn-box" >
                                                        <form class="record-formid" report-submit date-type="submit" @submit="recordFormId($event)">
                                                            <button form-type="submit">
                                                                <div class="btn-box" >
                                                                    <form class="record-formid" report-submit date-type="submit" @submit="recordFormId($event)">
                                                                        <button form-type="submit">
                                                                            <div class="btn-box" >
                                                                                <form class="record-formid" report-submit date-type="submit" @submit="recordFormId($event)">
                                                                                    <button form-type="submit">
                                                                                        <div class="btn-box" >
                                                                                            {{btnText}}
                                                                                        </div>
                                                                                    </button>
                                                                                </form>
                                                                            </div>
                                                                        </button>
                                                                    </form>
                                                                </div>
                                                            </button>
                                                        </form>
                                                    </div>
                                                </button>
                                            </form>
                                        </div>
                                    </button>
                                </form>
                            </div>
                        </button>
                    </form>
                </div>
            </button>
        </form>
    </div>
</template>

<script>
    export default {
        props: {
            type: {                         // 业务线
                type: String,
                default: "wxapp_sales"
            },
            source: {                       // 活动来源
                type: String,
                default: "default"
            },
            btnText: {                      // 按钮文字
                type: String,
                default: ""
            }
        },
        methods: {
            recordFormId(e){
                const self = this;
                const formId = e.mp.detail.formId || 0;
                this.mfwSdk.request({
                    url: '/formid/index/insert',
                    method: 'GET',
                    data: {
                         "data_decorate":{
                            "formId": formId,
                            "type": self.type,
                            "source": self.source,
                            "data_style": "default"
                        }
                    },
                    success: function(res) {
                    },
                    fail: function(res){
                        self.mfwSdk.track('sales_wxmp_js_error', {
                            page_name: "MultiFormId Component",
                            error_type: 'Fail to record formId',
                            error_msg: formId,
                        });
                    }
                })
            }
        },
    }
</script>

<style scoped lang="scss">
    .form-id-box{
        position: absolute;
        top: 0;right:0;bottom:0;left:0;
        transform: translateZ(0);
        .record-formid{
            .btn-box{
                width: 100%;
                position: fixed;
                top: 0;
                right: 0;
                bottom:0;
                left: 0;
            }
            button{
                height: 1rpx;
                width: 1rpx;
                margin: 0;
                padding: 0;
                border-color:transparent;
                border:none;
                background-color:transparent;
            }
        }
    }
</style>
