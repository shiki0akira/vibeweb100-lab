/* vibeweb100 實驗室共用的流量統計（GA4 資源「vibeweb100 lab」，跟 Woohop 分開）。
   每個作品在 <head> 加一行：<script src="../lab.js"></script>
   作品裡記錄事件：lab.track('事件名稱', {參數})。會自動帶上 work（作品資料夾名稱，例如 pack）。

   只在正式網址 lab.vibeweb100.com 上送出，在自己電腦打開檔案時不會送。
   不想讓自己的試玩算進數據：在這台裝置打開一次網址加 ?notrack（例如 lab.vibeweb100.com/pack/?notrack），
   之後這台裝置都不會送；想恢復就打開一次 ?track。網址加 ?test 時也不會送。 */
(function () {
  var ID = 'G-PEK8JWSS93';
  var q = new URLSearchParams(location.search);
  try {
    if (q.has('notrack')) localStorage.setItem('labNoTrack', '1');
    if (q.has('track')) localStorage.removeItem('labNoTrack');
  } catch (e) {}
  var off = false;
  try { off = localStorage.getItem('labNoTrack') === '1'; } catch (e) {}
  var on = location.hostname === 'lab.vibeweb100.com' && !off && !q.has('test');
  var work = location.pathname.split('/').filter(Boolean)[0] || 'home';

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.lab = {
    on: on,
    work: work,
    track: function (name, params) {
      if (!on) return;
      var p = params || {};
      p.work = work;
      gtag('event', name, p);
    }
  };
  if (!on) return;
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
  document.head.appendChild(s);
  gtag('js', new Date());
  gtag('config', ID, { work: work });
})();
