import React from 'react'

export default function Dashboard() {
    return (
        <>
            <div class="main-panel">
                <div class="content-wrapper">

                    <div class="row">
                        <div class="col-md-4 grid-margin stretch-card">
                            <div class="card bg-facebook d-flex align-items-center">
                                <div class="card-body py-5">
                                    <div
                                        class="d-flex flex-row align-items-center flex-wrap justify-content-md-center justify-content-xl-start py-1">
                                        <i class="mdi mdi-facebook text-white icon-lg"></i>
                                        <div class="ml-3 ml-md-0 ml-xl-3">
                                            <h5 class="text-white font-weight-bold">2.62 Subscribers</h5>
                                            <p class="mt-2 text-white card-text">You main list growing</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 grid-margin stretch-card">
                            <div class="card bg-google d-flex align-items-center">
                                <div class="card-body py-5">
                                    <div
                                        class="d-flex flex-row align-items-center flex-wrap justify-content-md-center justify-content-xl-start py-1">
                                        <i class="mdi mdi-google-plus text-white icon-lg"></i>
                                        <div class="ml-3 ml-md-0 ml-xl-3">
                                            <h5 class="text-white font-weight-bold">3.4k Followers</h5>
                                            <p class="mt-2 text-white card-text">You main list growing</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 grid-margin stretch-card">
                            <div class="card bg-twitter d-flex align-items-center">
                                <div class="card-body py-5">
                                    <div
                                        class="d-flex flex-row align-items-center flex-wrap justify-content-md-center justify-content-xl-start py-1">
                                        <i class="mdi mdi-twitter text-white icon-lg"></i>
                                        <div class="ml-3 ml-md-0 ml-xl-3">
                                            <h5 class="text-white font-weight-bold">3k followers</h5>
                                            <p class="mt-2 text-white card-text">You main list growing</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
                <footer class="footer">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-sm-flex justify-content-center justify-content-sm-between">
                                <span class="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © bootstrapdash.com 2020</span>
                                <span class="text-muted d-block text-center text-sm-left d-sm-inline-block">Distributed By: <a href="https://www.themewagon.com/" target="_blank">ThemeWagon</a></span>
                                <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center"> Free <a href="https://www.bootstrapdash.com/" target="_blank">Bootstrap dashboard templates</a> from Bootstrapdash.com</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}
